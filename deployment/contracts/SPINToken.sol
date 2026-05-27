// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                   LUKSO Fair — SPINToken                    ║
 * ║                                                              ║
 * ║  LSP7-conforme gratis spin token voor het LUKSO Fair        ║
 * ║  platform. Tokens worden verdeeld via airdrops en bonussen  ║
 * ║  en worden verbrand wanneer ze worden ingewisseld voor       ║
 * ║  spins of andere acties in het platform.                    ║
 * ║                                                              ║
 * ║  Platform:  LUKSO Fair (https://profile.link/lukso-fair)    ║
 * ║  Gemaakt door: @Dutch4Doctor (0xF8b8...)                    ║
 * ║  Versie: 2.0.0                                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * MECHANISME:
 * - 1 SPIN token = spinsPerToken acties in een basis-spel (standaard: 1)
 * - Voor duurdere spellen kan spinsPerToken > 1 zijn (bijv. 5 voor premium)
 * - Voor hele exclusieve acties kunnen meerdere tokens vereist zijn
 *   via minTokensRequired in het hoofdcontract
 * - Tokens worden door het FairContract verbrand bij gebruik
 */

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";

contract SPINToken is LSP7Mintable {

    // ─────────────────────────────────────────────────────────────
    //  CONSTANTEN — Rijke LSP4 metadata
    // ─────────────────────────────────────────────────────────────

    /// @dev Token naam (ook opgeslagen als LSP4TokenName)
    string public constant TOKEN_NAME    = "LUKSO Fair Spin Token";

    /// @dev Token symbool (ook opgeslagen als LSP4TokenSymbol)
    string public constant TOKEN_SYMBOL  = "SPIN";

    /// @dev Huidige versie van dit contract
    string public constant VERSION       = "2.0.0";

    /// @dev Platform naam
    string public constant PLATFORM      = "LUKSO Fair";

    /// @dev Platform profiel URL
    string public constant PLATFORM_URL  = "https://profile.link/lukso-fair@fBC4";

    /// @dev Gebruik van de token
    string public constant TOKEN_USE     = "Gratis spins en bonus acties op het LUKSO Fair platform";

    /// @dev Hoe tokens worden verkregen
    string public constant HOW_TO_EARN   = "Via volgers-airdrops, seizoensbonussen en community events";

    // ─────────────────────────────────────────────────────────────
    //  STATE VARIABELEN
    // ─────────────────────────────────────────────────────────────

    /// @notice Adres van het FairContract dat tokens mag verbranden
    address public fairContract;

    /// @notice Adres van de hoofd UP die tokens mag versturen naar volgers
    /// @dev 0xF8b8a4094165ba4f6d225f593392c04765FC6409 (Dutch4Doctor)
    address public constant OPERATOR_UP = 0xF8b8a4094165ba4f6d225f593392c04765FC6409;

    // ─────────────────────────────────────────────────────────────
    //  EVENTS
    // ─────────────────────────────────────────────────────────────

    event FairContractUpdated(address indexed oldContract, address indexed newContract);
    event TokensBurned(address indexed player, uint256 amount, string reason);
    event AirdropCompleted(address indexed operator, uint256 recipientCount, uint256 totalAmount);

    // ─────────────────────────────────────────────────────────────
    //  CONSTRUCTOR
    // ─────────────────────────────────────────────────────────────

    /**
     * @param _owner Het deployer-adres (LuksoFair UP)
     *
     * LSP4 token metadata wordt ingesteld via de parent constructor:
     * - LSP4TokenName  = TOKEN_NAME
     * - LSP4TokenSymbol = TOKEN_SYMBOL
     * - isNFT = false (fungible token, deelbaar)
     */
    constructor(address _owner)
        LSP7Mintable(TOKEN_NAME, TOKEN_SYMBOL, _owner, 0, false)
    {
        // Geef de hoofd UP direct operator-rechten
        // zodat @Dutch4Doctor SPIN tokens kan versturen aan volgers
        // zonder extra goedkeuringsstap
        _updateOperator(
            _owner,
            OPERATOR_UP,
            type(uint256).max,  // onbeperkte allowance
            true,
            ""
        );
    }

    // ─────────────────────────────────────────────────────────────
    //  ADMIN FUNCTIES
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Koppel het FairContract dat tokens mag verbranden
     * @dev Kan maar één keer worden ingesteld, daarna onwijzigbaar
     *      (tenzij opnieuw ingesteld door owner voor nieuw seizoen)
     * @param _fairContract Adres van het LUKSOFair hoofdcontract
     */
    function setFairContract(address _fairContract) external onlyOwner {
        require(_fairContract != address(0), "SPIN: ongeldig contract adres");
        address old = fairContract;
        fairContract = _fairContract;
        emit FairContractUpdated(old, _fairContract);
    }

    // ─────────────────────────────────────────────────────────────
    //  VERBRAND-FUNCTIE (alleen FairContract)
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Verbrand tokens van een speler bij gebruik van gratis spin
     * @dev Alleen aanroepbaar door het geregistreerde FairContract
     * @param player   Adres van de speler
     * @param amount   Aantal tokens om te verbranden (meestal 1 × decimals)
     * @param reason   Reden voor verbranding (bijv. "free_spin", "premium_spin")
     */
    function burnForSpin(
        address player,
        uint256 amount,
        string calldata reason
    ) external {
        require(msg.sender == fairContract, "SPIN: alleen FairContract mag verbranden");
        require(balanceOf(player) >= amount, "SPIN: onvoldoende SPIN tokens");
        _burn(player, amount, "");
        emit TokensBurned(player, amount, reason);
    }

    // ─────────────────────────────────────────────────────────────
    //  AIRDROP HULPFUNCTIE
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Verstuur SPIN tokens naar meerdere ontvangers tegelijk
     * @dev Gebruikt door OPERATOR_UP (@Dutch4Doctor) voor volgers-airdrops
     * @param recipients  Lijst van ontvangende adressen
     * @param amounts     Bijbehorende hoeveelheden (in token units)
     *
     * Voorbeeld: 50 volgers elk 1 SPIN token krijgen:
     *   recipients = [addr1, addr2, ..., addr50]
     *   amounts    = [1e18, 1e18, ..., 1e18]
     */
    function airdrop(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external {
        require(
            msg.sender == owner() || msg.sender == OPERATOR_UP,
            "SPIN: geen airdrop rechten"
        );
        require(recipients.length == amounts.length, "SPIN: lengte mismatch");
        require(recipients.length <= 200, "SPIN: max 200 per airdrop");

        uint256 totalAmount;
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "SPIN: nul adres niet toegestaan");
            totalAmount += amounts[i];
            _mint(recipients[i], amounts[i], true, "");
        }

        emit AirdropCompleted(msg.sender, recipients.length, totalAmount);
    }

    // ─────────────────────────────────────────────────────────────
    //  VIEW FUNCTIES
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Geeft uitgebreide metadata terug voor display in wallets/explorers
     */
    function getTokenInfo() external pure returns (
        string memory name,
        string memory symbol,
        string memory version,
        string memory platform,
        string memory platformUrl,
        string memory tokenUse,
        string memory howToEarn
    ) {
        return (
            TOKEN_NAME,
            TOKEN_SYMBOL,
            VERSION,
            PLATFORM,
            PLATFORM_URL,
            TOKEN_USE,
            HOW_TO_EARN
        );
    }

    /**
     * @notice Controleer of een adres genoeg SPIN tokens heeft voor een actie
     * @param player         Speler adres
     * @param tokensRequired Aantal benodigde tokens
     */
    function hasEnoughForAction(
        address player,
        uint256 tokensRequired
    ) external view returns (bool) {
        return balanceOf(player) >= tokensRequired * (10 ** decimals());
    }
}
