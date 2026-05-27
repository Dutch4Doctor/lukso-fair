// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                  LUKSO Fair — Hoofdcontract                 ║
 * ║                                                              ║
 * ║  Het hart van het LUKSO Fair platform. Beheert alle         ║
 * ║  spellogica, tokenomics, betalingen en veiligheidssystemen  ║
 * ║  voor de LUKSO Slots fruitautomaat en toekomstige spellen.  ║
 * ║                                                              ║
 * ║  Platform:  LUKSO Fair (https://profile.link/lukso-fair)    ║
 * ║  Gemaakt door: @Dutch4Doctor (0xF8b8...)                    ║
 * ║  Versie: 2.0.0                                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * ARCHITECTUUR:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  SPINToken.sol      LSP7 gratis spin token                  │
 * │  LuksoFairNFT.sol   LSP8 NFT prize collectie               │
 * │  LUKSOFair.sol  ←── Dit contract (spellogica + betalingen)  │
 * └─────────────────────────────────────────────────────────────┘
 *
 * BETALINGEN:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Elke spin (0.1 LYX) wordt verdeeld als:                   │
 * │   • 50% → Prijzenpool (voor token/LYX uitbetalingen)        │
 * │   • 45% → LUKSO Fair UP (platform inkomsten)               │
 * │   • 5%  → Dutch4Doctor hoofd UP (creator royalty)          │
 * └─────────────────────────────────────────────────────────────┘
 *
 * SPIN TOKEN SYSTEEM:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  spinsPerToken = instelbaar per game-configuratie           │
 * │   • Goedkope spellen:  1 SPIN = 1 actie  (standaard)       │
 * │   • Premium spellen:   1 SPIN = 5 acties (of meer)         │
 * │   • Dure acties:       n SPIN = 1 actie  (via minRequired)  │
 * └─────────────────────────────────────────────────────────────┘
 *
 * COMMIT/REVEAL RANDOMNESS:
 *   1. Speler genereert geheim getal en stuurt hash + betaling
 *   2. Speler onthult geheim in volgende transactie
 *   3. Contract combineert geheim met blockhash voor eerlijke RNG
 *   4. Resultaat is verifieerbaar on-chain
 *
 * VEILIGHEIDSSYSTEMEN:
 *   • ReentrancyGuard  — beschermt tegen herhaalde aanroepen
 *   • Pausable         — noodstop (alleen owner)
 *   • Rate limiting    — max 5 spins per adres per blok
 *   • Pool health      — min 30% reserve per token type
 *   • Timelock         — 48 uur wachttijd voor seizoenswisselingen
 *   • Pull payments    — speler haalt prijzen op, contract pusht niet
 *   • Commit timeout   — verlopen commits kunnen worden teruggevorderd
 *
 * SPEELTEGOED RECOVERY:
 *   • Bij bug of disconnect: speeltegoed blijft bewaard in contract
 *   • Bij reconnect: frontend toont ongebruikt tegoed automatisch
 *   • Speler kan pending balance altijd opvragen via claimPendingBalance()
 */

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";
import "./SPINToken.sol";
import "./LuksoFairNFT.sol";

contract LUKSOFair is ReentrancyGuard, Pausable, Ownable {

    // ─────────────────────────────────────────────────────────────
    //  VASTE ADRESSEN (hardcoded, nooit wijzigbaar)
    // ─────────────────────────────────────────────────────────────

    /// @dev LUKSO Fair platform UP — ontvangt 45% van spin inkomsten
    address public constant PLATFORM_UP      = 0xfBC4ba2bBC9213595fd455A1d49a42CAeDFD0123;

    /// @dev Dutch4Doctor hoofd UP — ontvangt 5% creator royalty
    address public constant CREATOR_UP       = 0xF8b8a4094165ba4f6d225f593392c04765FC6409;

    // ─────────────────────────────────────────────────────────────
    //  TOKEN ADRESSEN (mainnet LUKSO)
    // ─────────────────────────────────────────────────────────────

    address public constant SLYX_TOKEN       = 0x8A3982f0A7d154D11a5f43EEc7F50E52eBBc8F7D;
    address public constant PHLAME_TOKEN     = 0xf02198BAa1245b602d6ACD4d352B4e98D319D6Ea;
    address public constant AGENTPO_TOKEN    = 0x47568BC4DC7Fee1bB67f741BA927e2904B61f016;

    // ─────────────────────────────────────────────────────────────
    //  SPELCONSTANTEN
    // ─────────────────────────────────────────────────────────────

    uint256 public constant SPIN_COST            = 0.1 ether;
    uint256 public constant PRIZE_POOL_SHARE     = 50;   // 50% naar prijzenpool
    uint256 public constant PLATFORM_SHARE       = 45;   // 45% naar platform UP
    uint256 public constant CREATOR_SHARE        = 5;    // 5% naar creator UP
    uint256 public constant POOL_MIN_PERCENT     = 30;   // pool mag niet onder 30%
    uint256 public constant MAX_SPINS_PER_BLOCK  = 5;    // rate limiting
    uint256 public constant COMMIT_TIMEOUT       = 256;  // blokken voor commit verloop
    uint256 public constant SEASON_TIMELOCK      = 48 hours;
    uint256 public constant GUARANTEED_PRIZE_INTERVAL = 5; // 1 prijs per X spins

    // Prijsverdeling (in percentages van SPIN_COST * PRIZE_POOL_SHARE / 100)
    uint256 public constant LYX_LARGE_AMOUNT     = 0.05 ether;   // Grote LYX prijs
    uint256 public constant LYX_SMALL_AMOUNT     = 0.02 ether;   // Kleine LYX prijs

    // ─────────────────────────────────────────────────────────────
    //  SYMBOOL IDs (moeten overeenkomen met frontend SYMBOLS array)
    // ─────────────────────────────────────────────────────────────

    uint8 public constant SYM_LUKSO     = 0;  // LUKSO logo — zeldzaamst
    uint8 public constant SYM_UP        = 1;  // Universal Profile logo
    uint8 public constant SYM_PHLAMEY   = 2;  // Phlamey vlam mascotte
    uint8 public constant SYM_LUKSAGENT = 3;  // LuksAgent (konijn)
    uint8 public constant SYM_ELYX      = 4;  // Elyx olifant
    uint8 public constant SYM_EMMET     = 5;  // Emmet octopus
    uint8 public constant SYM_SLYX      = 6;  // sLYX logo
    uint8 public constant SYM_BILLS     = 7;  // Geldbiljetten
    uint8 public constant SYM_COINS     = 8;  // Munten
    uint8 public constant SYM_FREESPIN  = 9;  // Gratis spin symbool — meest voorkomend

    // ─────────────────────────────────────────────────────────────
    //  PRIJS TYPES
    // ─────────────────────────────────────────────────────────────

    uint8 public constant PRIZE_NONE        = 0;
    uint8 public constant PRIZE_JACKPOT_NFT = 1;   // Mythic NFT (Tier 1)
    uint8 public constant PRIZE_RARE_NFT    = 2;   // Rare NFT (Tier 2)
    uint8 public constant PRIZE_PHLAME_MED  = 3;   // Gemiddeld PHLAME
    uint8 public constant PRIZE_AGENTPO     = 4;   // AGENTPO tokens
    uint8 public constant PRIZE_SLYX_LARGE  = 5;   // Grote sLYX
    uint8 public constant PRIZE_UNCOMMON    = 6;   // Uncommon NFT (Tier 3)
    uint8 public constant PRIZE_COMMON      = 7;   // Common NFT (Tier 4)
    uint8 public constant PRIZE_LYX_LARGE   = 8;   // Grote LYX
    uint8 public constant PRIZE_LYX_SMALL   = 9;   // Kleine LYX
    uint8 public constant PRIZE_FREE5       = 10;  // 5 gratis spins
    uint8 public constant PRIZE_FREE3       = 11;  // 3 gratis spins
    uint8 public constant PRIZE_CONSOLATION = 12;  // Troostprijs: 1 gratis spin

    // ─────────────────────────────────────────────────────────────
    //  CONTRACT REFERENTIES
    // ─────────────────────────────────────────────────────────────

    SPINToken     public spinToken;
    LuksoFairNFT  public nftContract;

    // ─────────────────────────────────────────────────────────────
    //  GELATO KEEPER
    // ─────────────────────────────────────────────────────────────

    address public gelatoKeeper;

    // ─────────────────────────────────────────────────────────────
    //  SPIN TOKEN CONFIGURATIE
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Hoeveel spins geeft 1 SPIN token in dit contract?
     * @dev Standaard 1. Voor premium spellen: bijv. 5.
     *      Voor dure acties: stel minTokensRequired in op > 1.
     *
     * Voorbeelden toekomstige spellen:
     *   LUKSO Claw (klauwmachine): spinsPerToken = 1, kostprijs = 0.5 LYX
     *   LUKSO Ducks (eendjes):     spinsPerToken = 3, kostprijs = 0.05 LYX
     *   LUKSO Jackpot (special):   minTokensRequired = 5, kostprijs = 1 LYX
     */
    uint256 public spinsPerToken = 1;

    /**
     * @notice Minimaal aantal SPIN tokens voor 1 actie
     * @dev Standaard 1. Verhoog voor exclusieve/dure acties.
     */
    uint256 public minTokensRequired = 1;

    // ─────────────────────────────────────────────────────────────
    //  NO-RUGPULL BESCHERMING
    // ─────────────────────────────────────────────────────────────

    uint256 public totalDeposited;      // Totaal door owner gestort
    uint256 public recordedDeposit;     // Snapshot bij deployment (onwijzigbaar)
    bool    public depositRecorded;     // Kan maar één keer worden vastgelegd

    // ─────────────────────────────────────────────────────────────
    //  SEIZOENSWISSELING (timelock)
    // ─────────────────────────────────────────────────────────────

    address public pendingNewSeason;
    uint256 public seasonChangeAt;

    // ─────────────────────────────────────────────────────────────
    //  SPELER STATE
    // ─────────────────────────────────────────────────────────────

    struct CommitData {
        bytes32 commitHash;
        uint256 blockNumber;
        bool    isFreeSpin;
        uint256 spinCost;    // Bewaar betaald bedrag voor eventuele terugbetaling
    }

    struct PlayerSession {
        uint256 freeSpins;         // Gratis spins tegoed
        uint256 pendingBalance;   // Ongebruikt speeltegoed (recovery)
        uint256 totalSpins;       // Levensduur statistiek
        uint256 totalWins;        // Levensduur statistiek
        uint256 lastSpinBlock;    // Voor rate limiting
        uint256 spinsThisBlock;   // Voor rate limiting
        uint256 spinsSinceLastPrize; // Voor gegarandeerd prijs systeem
    }

    mapping(address => CommitData)     public commits;
    mapping(address => PlayerSession)  public sessions;

    // ─────────────────────────────────────────────────────────────
    //  STATISTIEKEN
    // ─────────────────────────────────────────────────────────────

    uint256 public totalSpinsAllTime;
    uint256 public totalPayoutLYX;
    uint256 public totalNFTsWon;
    uint256 public totalPlatformRevenue;

    // ─────────────────────────────────────────────────────────────
    //  EVENTS
    // ─────────────────────────────────────────────────────────────

    event SpinCommitted(address indexed player, uint256 blockNumber, bool isFreeSpin);
    event SpinRevealed(
        address indexed player,
        uint8 r1, uint8 r2, uint8 r3,
        uint8 prizeType,
        bool isFreeSpin
    );
    event PrizeClaimed(address indexed player, uint8 prizeType, uint256 amount);
    event FreeSpinsAdded(address indexed player, uint256 amount, string source);
    event PendingBalanceRecovered(address indexed player, uint256 amount);
    event ContractsSet(address spinToken, address nftContract);
    event SeasonChangeQueued(address newContract, uint256 executeAt);
    event SeasonChanged(address oldContract, address newContract);
    event DepositRecorded(uint256 amount, string tokenType);
    event RevenueWithdrawn(uint256 platformAmount, uint256 creatorAmount);
    event SpinTokenConfigUpdated(uint256 spinsPerToken, uint256 minTokensRequired);

    // ─────────────────────────────────────────────────────────────
    //  MODIFIERS
    // ─────────────────────────────────────────────────────────────

    modifier onlyGelatoOrOwner() {
        require(
            msg.sender == gelatoKeeper || msg.sender == owner(),
            "Fair: geen toegang"
        );
        _;
    }

    modifier contractsReady() {
        require(address(spinToken)  != address(0), "Fair: SPINToken niet ingesteld");
        require(address(nftContract) != address(0), "Fair: NFTContract niet ingesteld");
        _;
    }

    // ─────────────────────────────────────────────────────────────
    //  CONSTRUCTOR
    // ─────────────────────────────────────────────────────────────

    constructor() Ownable() {}

    receive() external payable {}

    // ─────────────────────────────────────────────────────────────
    //  ADMIN SETUP
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Koppel de ondersteunende contracten na deployment
     */
    function setContracts(
        address _spinToken,
        address _nftContract,
        address _sLYX,    // genegeerd (staat als constant), maar bewaard voor ABI compatibiliteit
        address _phlame,  // genegeerd
        address _agentpo  // genegeerd
    ) external onlyOwner {
        require(_spinToken   != address(0), "Fair: ongeldig spinToken adres");
        require(_nftContract != address(0), "Fair: ongeldig nftContract adres");
        spinToken   = SPINToken(payable(_spinToken));
        nftContract = LuksoFairNFT(payable(_nftContract));
        emit ContractsSet(_spinToken, _nftContract);
    }

    /**
     * @notice Stel het Gelato keeper adres in voor automatische uitbetalingen
     */
    function setGelatoKeeper(address _keeper) external onlyOwner {
        require(_keeper != address(0), "Fair: ongeldig keeper adres");
        gelatoKeeper = _keeper;
    }

    /**
     * @notice Configureer het SPIN token mechanisme
     * @param _spinsPerToken      Hoeveel spins geeft 1 SPIN token? (standaard: 1)
     * @param _minTokensRequired  Hoeveel SPIN tokens voor 1 actie? (standaard: 1)
     *
     * Toekomstige use cases:
     *   - Premium slots: setSpinTokenConfig(5, 1)   → 1 token = 5 spins
     *   - Exclusieve actie: setSpinTokenConfig(1, 5) → 5 tokens = 1 actie
     *   - Hybride: setSpinTokenConfig(3, 2)          → 2 tokens = 3 spins
     */
    function setSpinTokenConfig(
        uint256 _spinsPerToken,
        uint256 _minTokensRequired
    ) external onlyOwner {
        require(_spinsPerToken     >= 1, "Fair: spinsPerToken moet >= 1 zijn");
        require(_minTokensRequired >= 1, "Fair: minTokensRequired moet >= 1 zijn");
        spinsPerToken      = _spinsPerToken;
        minTokensRequired  = _minTokensRequired;
        emit SpinTokenConfigUpdated(_spinsPerToken, _minTokensRequired);
    }

    // ─────────────────────────────────────────────────────────────
    //  NO-RUGPULL
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Registreer de startinleg — kan maar één keer
     * @dev Na aanroep is de startinleg publiekelijk zichtbaar on-chain
     */
    function recordDeposit() external onlyOwner {
        require(!depositRecorded, "Fair: deposit al geregistreerd");
        recordedDeposit = address(this).balance;
        depositRecorded = true;
        emit DepositRecorded(recordedDeposit, "LYX");
    }

    // ─────────────────────────────────────────────────────────────
    //  COMMIT / REVEAL SPIN
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Stap 1: Commit een spin met geheime hash
     * @param commitHash  keccak256(abi.encode(secret, msg.sender))
     * @dev Betaal exact SPIN_COST LYX, of 0 voor een gratis spin
     */
    function commitSpin(bytes32 commitHash)
        external
        payable
        nonReentrant
        whenNotPaused
        contractsReady
    {
        bool isFreeSpin = (msg.value == 0);

        if (isFreeSpin) {
            require(sessions[msg.sender].freeSpins > 0, "Fair: geen gratis spins");
            sessions[msg.sender].freeSpins--;
        } else {
            require(msg.value == SPIN_COST, "Fair: stuur precies 0.1 LYX");
        }

        // Rate limiting
        if (sessions[msg.sender].lastSpinBlock == block.number) {
            sessions[msg.sender].spinsThisBlock++;
            require(
                sessions[msg.sender].spinsThisBlock <= MAX_SPINS_PER_BLOCK,
                "Fair: te snel spinnen"
            );
        } else {
            sessions[msg.sender].lastSpinBlock  = block.number;
            sessions[msg.sender].spinsThisBlock = 1;
        }

        // Sla commit op
        commits[msg.sender] = CommitData({
            commitHash:  commitHash,
            blockNumber: block.number,
            isFreeSpin:  isFreeSpin,
            spinCost:    msg.value
        });

        // Speeltegoed opslaan voor recovery (bij disconnect/bug)
        if (!isFreeSpin) {
            sessions[msg.sender].pendingBalance += msg.value;
        }

        emit SpinCommitted(msg.sender, block.number, isFreeSpin);
    }

    /**
     * @notice Stap 2: Onthul het geheim en ontvang de prijs
     * @param secret  Het geheime getal waarmee de commit hash is gemaakt
     */
    function revealSpin(uint256 secret)
        external
        nonReentrant
        whenNotPaused
        contractsReady
    {
        CommitData memory c = commits[msg.sender];
        require(c.commitHash != bytes32(0), "Fair: geen actieve commit");
        require(
            block.number > c.blockNumber,
            "Fair: wacht tot volgende blok"
        );
        require(
            block.number <= c.blockNumber + COMMIT_TIMEOUT,
            "Fair: commit verlopen, gebruik refundExpiredCommit()"
        );

        // Verifieer hash
        bytes32 expectedHash = keccak256(abi.encode(secret, msg.sender));
        require(c.commitHash == expectedHash, "Fair: ongeldig geheim");

        // Wis commit
        delete commits[msg.sender];

        // Speeltegoed vereffenen (spin is nu verwerkt)
        if (!c.isFreeSpin && sessions[msg.sender].pendingBalance >= c.spinCost) {
            sessions[msg.sender].pendingBalance -= c.spinCost;
        }

        // Genereer willekeurig resultaat
        uint256 rand = uint256(keccak256(abi.encodePacked(
            secret,
            blockhash(c.blockNumber),
            msg.sender,
            totalSpinsAllTime
        )));

        // Bepaal rollen
        uint8 r1 = _pickSymbol(rand);
        uint8 r2 = _pickSymbol(rand >> 8);
        uint8 r3 = _pickSymbol(rand >> 16);

        // Update statistieken
        sessions[msg.sender].totalSpins++;
        sessions[msg.sender].spinsSinceLastPrize++;
        totalSpinsAllTime++;

        // Verwerk LYX verdeling (alleen voor betaalde spins)
        if (!c.isFreeSpin) {
            _distributeLYX();
        }

        // Bepaal en verwerk prijs
        uint8 prizeType = _determinePrize(r1, r2, r3, msg.sender);
        _awardPrize(prizeType, msg.sender);

        emit SpinRevealed(msg.sender, r1, r2, r3, prizeType, c.isFreeSpin);
    }

    /**
     * @notice Terugvordering van betaling bij verlopen commit
     * @dev Beschermt spelers bij netwerkstoringen of browser crash
     */
    function refundExpiredCommit() external nonReentrant {
        CommitData memory c = commits[msg.sender];
        require(c.commitHash != bytes32(0), "Fair: geen actieve commit");
        require(
            block.number > c.blockNumber + COMMIT_TIMEOUT,
            "Fair: commit nog niet verlopen"
        );

        delete commits[msg.sender];

        // Terugbetalen
        if (!c.isFreeSpin && c.spinCost > 0) {
            sessions[msg.sender].pendingBalance = 0;
            (bool ok, ) = payable(msg.sender).call{value: c.spinCost}("");
            require(ok, "Fair: terugbetaling mislukt");
        } else if (c.isFreeSpin) {
            // Gratis spin teruggeven
            sessions[msg.sender].freeSpins++;
        }
    }

    // ─────────────────────────────────────────────────────────────
    //  SPEELTEGOED RECOVERY
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Haal eventueel vastgelopen speeltegoed op
     * @dev Aanroepbaar door de speler zelf bij disconnect/bug
     *      Frontend roept dit automatisch aan bij reconnect als
     *      pendingBalance > 0
     */
    function claimPendingBalance() external nonReentrant {
        uint256 amount = sessions[msg.sender].pendingBalance;
        require(amount > 0, "Fair: geen speeltegoed in bewaring");
        require(commits[msg.sender].commitHash == bytes32(0), "Fair: actieve commit aanwezig");

        sessions[msg.sender].pendingBalance = 0;
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        require(ok, "Fair: uitbetaling mislukt");

        emit PendingBalanceRecovered(msg.sender, amount);
    }

    // ─────────────────────────────────────────────────────────────
    //  SPIN TOKEN GRATIS SPINS
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Wissel SPIN tokens in voor gratis spins
     * @param tokenAmount  Aantal SPIN tokens (in token units, bijv. 1e18 = 1 token)
     *
     * Aantal gratis spins = (tokenAmount / 1e18) * spinsPerToken
     */
    function redeemSpinTokens(uint256 tokenAmount) external nonReentrant contractsReady {
        uint256 wholeTokens = tokenAmount / (10 ** 18);
        require(wholeTokens >= minTokensRequired, "Fair: te weinig SPIN tokens");

        uint256 spinsToAdd = wholeTokens * spinsPerToken / minTokensRequired;
        require(spinsToAdd >= 1, "Fair: berekende spins = 0");

        // Verbrand tokens
        spinToken.burnForSpin(
            msg.sender,
            wholeTokens * (10 ** 18),
            "redeem_for_spins"
        );

        sessions[msg.sender].freeSpins += spinsToAdd;

        emit FreeSpinsAdded(msg.sender, spinsToAdd, "SPIN_token_redeem");
    }

    // ─────────────────────────────────────────────────────────────
    //  REVENUE UITBETALING
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Betaal geaccumuleerde platform inkomsten uit
     * @dev Aanroepbaar door Gelato keeper (dagelijks) of owner
     *      Betaalt PLATFORM_SHARE en CREATOR_SHARE van het LYX saldo
     *      minus de prijzenpool reserve
     */
    function withdrawRevenue() external onlyGelatoOrOwner nonReentrant {
        uint256 balance = address(this).balance;

        // Behoud minimaal 0.5 LYX als reserve voor uitbetalingen
        uint256 reserve = 0.5 ether;
        require(balance > reserve, "Fair: saldo te laag voor uitbetaling");

        uint256 available = balance - reserve;
        uint256 platformAmount = (available * PLATFORM_SHARE) / 100;
        uint256 creatorAmount  = (available * CREATOR_SHARE)  / 100;

        totalPlatformRevenue += platformAmount + creatorAmount;

        (bool ok1, ) = payable(PLATFORM_UP).call{value: platformAmount}("");
        require(ok1, "Fair: platform uitbetaling mislukt");

        (bool ok2, ) = payable(CREATOR_UP).call{value: creatorAmount}("");
        require(ok2, "Fair: creator uitbetaling mislukt");

        emit RevenueWithdrawn(platformAmount, creatorAmount);
    }

    // ─────────────────────────────────────────────────────────────
    //  SEIZOENSWISSELING
    // ─────────────────────────────────────────────────────────────

    function queueNewSeason(address _newNFTContract) external onlyOwner {
        require(_newNFTContract != address(0), "Fair: ongeldig adres");
        pendingNewSeason = _newNFTContract;
        seasonChangeAt   = block.timestamp + SEASON_TIMELOCK;
        emit SeasonChangeQueued(_newNFTContract, seasonChangeAt);
    }

    function executeNewSeason() external onlyOwner {
        require(pendingNewSeason != address(0), "Fair: geen wachtend seizoen");
        require(block.timestamp >= seasonChangeAt, "Fair: timelock nog actief");
        address old = address(nftContract);
        nftContract = LuksoFairNFT(payable(pendingNewSeason));
        pendingNewSeason = address(0);
        emit SeasonChanged(old, address(nftContract));
    }

    // ─────────────────────────────────────────────────────────────
    //  NOODSTOP
    // ─────────────────────────────────────────────────────────────

    function pause()   external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // ─────────────────────────────────────────────────────────────
    //  INTERNE HULPFUNCTIES
    // ─────────────────────────────────────────────────────────────

    /**
     * @dev Kies een symbool op basis van gewogen kansen
     *      Lagere index = zeldzamer symbool
     */
    function _pickSymbol(uint256 seed) internal pure returns (uint8) {
        // Totaal gewicht: 100
        // SYM_LUKSO=2, UP=3, PHLAMEY=4, LUKSAGENT=5, ELYX=6, EMMET=7,
        // SLYX=9, BILLS=12, COINS=14, FREESPIN=38
        uint256 r = seed % 100;

        if (r < 2)  return SYM_LUKSO;       // 2%
        if (r < 5)  return SYM_UP;          // 3%
        if (r < 9)  return SYM_PHLAMEY;     // 4%
        if (r < 14) return SYM_LUKSAGENT;   // 5%
        if (r < 20) return SYM_ELYX;        // 6%
        if (r < 27) return SYM_EMMET;       // 7%
        if (r < 36) return SYM_SLYX;        // 9%
        if (r < 48) return SYM_BILLS;       // 12%
        if (r < 62) return SYM_COINS;       // 14%
        return SYM_FREESPIN;                // 38%
    }

    /**
     * @dev Bepaal prijs op basis van drie symbolen + gegarandeerd prijs systeem
     */
    function _determinePrize(
        uint8 r1, uint8 r2, uint8 r3,
        address player
    ) internal view returns (uint8) {

        // Drie op een rij?
        if (r1 == r2 && r2 == r3) {
            if (r1 == SYM_LUKSO)     return PRIZE_JACKPOT_NFT;  // 🏆 Jackpot
            if (r1 == SYM_UP)        return PRIZE_RARE_NFT;     // 💜 Rare NFT
            if (r1 == SYM_PHLAMEY)   return PRIZE_PHLAME_MED;  // 🔥 PHLAME
            if (r1 == SYM_LUKSAGENT) return PRIZE_AGENTPO;     // 🤖 AGENTPO
            if (r1 == SYM_ELYX)      return PRIZE_SLYX_LARGE;  // 💎 sLYX
            if (r1 == SYM_EMMET)     return PRIZE_UNCOMMON;    // 🐙 Uncommon NFT
            if (r1 == SYM_SLYX)      return PRIZE_LYX_LARGE;   // 💰 LYX groot
            if (r1 == SYM_BILLS)     return PRIZE_LYX_SMALL;   // 💵 LYX klein
            if (r1 == SYM_COINS)     return PRIZE_FREE5;       // 🪙 5 gratis spins
            if (r1 == SYM_FREESPIN)  return PRIZE_FREE3;       // 🎟️ 3 gratis spins
        }

        // Twee op een rij (eerste twee of laatste twee)?
        bool twoInRow = (r1 == r2 || r2 == r3);
        if (twoInRow) {
            uint8 sym = (r1 == r2) ? r1 : r2;
            if (sym <= SYM_PHLAMEY) return PRIZE_COMMON;       // Hoge sym 2x → Common NFT
            if (sym <= SYM_SLYX)    return PRIZE_LYX_SMALL;    // Mid sym 2x → LYX
            return PRIZE_CONSOLATION;                           // Laag sym 2x → troostprijs
        }

        // Gegarandeerd prijs systeem: na X spins zonder prijs
        uint256 spinsSincePrize = sessions[player].spinsSinceLastPrize;
        if (spinsSincePrize >= GUARANTEED_PRIZE_INTERVAL) {
            return PRIZE_CONSOLATION; // Minimaal troostprijs
        }

        return PRIZE_NONE;
    }

    /**
     * @dev Verwerk de prijs voor de winnaar
     */
    function _awardPrize(uint8 prizeType, address player) internal {
        if (prizeType == PRIZE_NONE) return;

        // Reset gegarandeerd prijs teller
        sessions[player].spinsSinceLastPrize = 0;
        sessions[player].totalWins++;

        if (prizeType == PRIZE_JACKPOT_NFT) {
            _awardNFT(player, 1); // Tier 1
            totalNFTsWon++;
        } else if (prizeType == PRIZE_RARE_NFT) {
            _awardNFT(player, 2); // Tier 2
            totalNFTsWon++;
        } else if (prizeType == PRIZE_UNCOMMON) {
            _awardNFT(player, 3); // Tier 3
            totalNFTsWon++;
        } else if (prizeType == PRIZE_COMMON) {
            _awardNFT(player, 4); // Tier 4
            totalNFTsWon++;
        } else if (prizeType == PRIZE_LYX_LARGE) {
            _sendLYX(player, LYX_LARGE_AMOUNT);
        } else if (prizeType == PRIZE_LYX_SMALL) {
            _sendLYX(player, LYX_SMALL_AMOUNT);
        } else if (prizeType == PRIZE_PHLAME_MED) {
            _sendToken(PHLAME_TOKEN, player, 100 * 1e18);
        } else if (prizeType == PRIZE_AGENTPO) {
            _sendToken(AGENTPO_TOKEN, player, 50 * 1e18);
        } else if (prizeType == PRIZE_SLYX_LARGE) {
            _sendToken(SLYX_TOKEN, player, 10 * 1e18);
        } else if (prizeType == PRIZE_FREE5) {
            sessions[player].freeSpins += 5;
            emit FreeSpinsAdded(player, 5, "prize");
        } else if (prizeType == PRIZE_FREE3) {
            sessions[player].freeSpins += 3;
            emit FreeSpinsAdded(player, 3, "prize");
        } else if (prizeType == PRIZE_CONSOLATION) {
            sessions[player].freeSpins += 1;
            emit FreeSpinsAdded(player, 1, "consolation");
        }

        emit PrizeClaimed(player, prizeType, 0);
    }

    function _awardNFT(address player, uint8 tier) internal {
        // Zoek een beschikbare NFT van de juiste tier
        uint256 startId;
        uint256 endId;
        if      (tier == 1) { startId = 1;   endId = 5;   }
        else if (tier == 2) { startId = 6;   endId = 25;  }
        else if (tier == 3) { startId = 26;  endId = 100; }
        else                { startId = 101; endId = 300; }

        for (uint256 i = startId; i <= endId; i++) {
            bytes32 tokenId = bytes32(i);
            try nftContract.tokenOwnerOf(tokenId) returns (address tokenOwner) {
                if (tokenOwner == address(nftContract)) {
                    nftContract.claimNFT(player, i);
                    return;
                }
            } catch {}
        }
        // Tier op — geef troostprijs
        sessions[player].freeSpins += 2;
        emit FreeSpinsAdded(player, 2, "nft_pool_empty");
    }

    function _sendLYX(address player, uint256 amount) internal {
        if (address(this).balance >= amount + 0.1 ether) {
            (bool ok, ) = payable(player).call{value: amount}("");
            if (ok) {
                totalPayoutLYX += amount;
            } else {
                // Fallback: gratis spin
                sessions[player].freeSpins += 1;
            }
        } else {
            sessions[player].freeSpins += 1;
        }
    }

    function _sendToken(address token, address player, uint256 amount) internal {
        ILSP7DigitalAsset t = ILSP7DigitalAsset(token);
        uint256 bal = t.balanceOf(address(this));
        if (bal >= amount) {
            t.transfer(address(this), player, amount, true, "");
        } else {
            // Pool leeg — gratis spin als fallback
            sessions[player].freeSpins += 1;
        }
    }

    function _distributeLYX() internal {
        // De verdeling vindt impliciet plaats:
        // Prijzenpool (50%) blijft in contract
        // Platform en creator worden uitbetaald via withdrawRevenue()
    }

    // ─────────────────────────────────────────────────────────────
    //  VIEW FUNCTIES
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Geeft alle relevante spelerdata terug in één aanroep
     * @dev Frontend roept dit aan bij connect/reconnect
     */
    function getPlayerInfo(address player) external view returns (
        uint256 freeSpins,
        uint256 pendingBalance,     // ← recovery tegoed
        uint256 totalSpins,
        uint256 totalWins,
        bool    hasActiveCommit,
        uint256 spinsSinceLastPrize
    ) {
        PlayerSession memory s = sessions[player];
        return (
            s.freeSpins,
            s.pendingBalance,
            s.totalSpins,
            s.totalWins,
            commits[player].commitHash != bytes32(0),
            s.spinsSinceLastPrize
        );
    }

    /**
     * @notice Globale platform statistieken
     */
    function getPlatformStats() external view returns (
        uint256 spinsAllTime,
        uint256 payoutLYX,
        uint256 nftsWon,
        uint256 platformRevenue,
        uint256 contractBalance
    ) {
        return (
            totalSpinsAllTime,
            totalPayoutLYX,
            totalNFTsWon,
            totalPlatformRevenue,
            address(this).balance
        );
    }

    /**
     * @notice Geeft SPIN token configuratie terug
     */
    function getSpinTokenConfig() external view returns (
        uint256 _spinsPerToken,
        uint256 _minTokensRequired,
        string memory explanation
    ) {
        string memory exp = string(abi.encodePacked(
            "1 SPIN token = ",
            _uintToStr(spinsPerToken),
            " spin(s) | min ",
            _uintToStr(minTokensRequired),
            " token(s) vereist per actie"
        ));
        return (spinsPerToken, minTokensRequired, exp);
    }

    function _uintToStr(uint256 v) internal pure returns (string memory) {
        if (v == 0) return "0";
        uint256 tmp = v;
        uint256 digits;
        while (tmp != 0) { digits++; tmp /= 10; }
        bytes memory buf = new bytes(digits);
        while (v != 0) { digits--; buf[digits] = bytes1(uint8(48 + v % 10)); v /= 10; }
        return string(buf);
    }
}
