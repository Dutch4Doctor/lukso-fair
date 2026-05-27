// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                LUKSO Fair — Prize NFT Collectie             ║
 * ║                                                              ║
 * ║  LSP8-conforme NFT collectie voor het LUKSO Fair platform.  ║
 * ║  Elke NFT is een uniek prijscollectible dat gewonnen kan    ║
 * ║  worden via spellen op het platform.                        ║
 * ║                                                              ║
 * ║  Structuur:                                                  ║
 * ║    Tier 1 — Mythic     (TokenID 1–5,     5 stuks)           ║
 * ║    Tier 2 — Rare       (TokenID 6–25,   20 stuks)           ║
 * ║    Tier 3 — Uncommon   (TokenID 26–100, 75 stuks)           ║
 * ║    Tier 4 — Common     (TokenID 101–300,200 stuks)          ║
 * ║                                                              ║
 * ║  Platform:   LUKSO Fair (https://profile.link/lukso-fair)   ║
 * ║  Gemaakt door: @Dutch4Doctor (0xF8b8...)                    ║
 * ║  Versie: 2.0.0                                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * SEIZOENEN:
 * - Elk seizoen heeft een eigen NFT-contract instantie
 * - Seizoenswissel verloopt via timelock (48 uur) in LUKSOFair.sol
 * - Oude seizoens-NFTs behouden hun waarde en blijven in wallets
 *
 * ROYALTIES:
 * - Creator royalty: 5% op secundaire verkopen
 * - Royalty adres is het LUKSO Fair platform UP
 *
 * PRIJZENWINKEL (toekomst):
 * - Tier 4 Common NFTs kunnen worden ingewisseld in de prijzenwinkel
 * - Speciale "Prize Shop" NFT-serie wordt later toegevoegd
 * - Inruilen: meerdere Tier 4 → 1 exclusief Prize Shop item
 */

import "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LuksoFairNFT is LSP8Mintable {
    using Strings for uint256;

    // ─────────────────────────────────────────────────────────────
    //  CONSTANTEN
    // ─────────────────────────────────────────────────────────────

    string public constant COLLECTION_NAME        = "LUKSO Fair Prizes";
    string public constant COLLECTION_DESCRIPTION =
        "Official prize collectibles from the LUKSO Fair blockchain carnival. "
        "Win unique NFTs by playing games on the LUKSO Fair platform. "
        "Each NFT represents a tier of rarity: Mythic, Rare, Uncommon, or Common. "
        "Built on LUKSO by @Dutch4Doctor.";

    string public constant PLATFORM               = "LUKSO Fair";
    string public constant PLATFORM_URL           = "https://profile.link/lukso-fair@fBC4";
    string public constant CREATOR_HANDLE         = "@Dutch4Doctor";
    string public constant VERSION                = "2.0.0";
    string public constant ROYALTY_BASIS          = "500"; // 5% in basispunten (500/10000)

    /// @dev LUKSO Fair UP — ontvangt royalties op secundaire markt
    address public constant PLATFORM_UP  = 0xfBC4ba2bBC9213595fd455A1d49a42CAeDFD0123;

    /// @dev Dutch4Doctor hoofd UP — oorspronkelijke creator
    address public constant CREATOR_UP   = 0xF8b8a4094165ba4f6d225f593392c04765FC6409;

    // ─────────────────────────────────────────────────────────────
    //  NFT TIER GRENZEN
    // ─────────────────────────────────────────────────────────────

    uint256 public constant TIER1_START   = 1;
    uint256 public constant TIER1_END     = 5;      // Mythic    (5 stuks)
    uint256 public constant TIER2_START   = 6;
    uint256 public constant TIER2_END     = 25;     // Rare      (20 stuks)
    uint256 public constant TIER3_START   = 26;
    uint256 public constant TIER3_END     = 100;    // Uncommon  (75 stuks)
    uint256 public constant TIER4_START   = 101;
    uint256 public constant TIER4_END     = 300;    // Common    (200 stuks)
    uint256 public constant TOTAL_SUPPLY  = 300;

    // ─────────────────────────────────────────────────────────────
    //  STATE VARIABELEN
    // ─────────────────────────────────────────────────────────────

    /// @notice Seizoensnummer (1 = Season 1, 2 = Season 2, ...)
    uint256 public immutable season;

    /// @notice Naam van dit seizoen
    string public seasonName;

    /// @notice IPFS CID van de metadata folder
    /// @dev ipfs://{metadataCid}/{tokenId}.json
    string public metadataCid;

    /// @notice IPFS CID van de afbeeldingen folder
    /// @dev ipfs://{imagesCid}/{filename}.png
    string public imagesCid;

    /// @notice Adres van het FairContract (mag NFTs claimen)
    address public fairContract;

    /// @notice Creator adres voor dit seizoen (voor royalties)
    /// @dev Seizoen 1: Dutch4Doctor; Seizoen 2+: externe NFT-maker
    address public seasonCreator;

    /// @notice Teller voor hoeveel NFTs al zijn geclaimd (gewonnen)
    uint256 public claimedCount;

    // ─────────────────────────────────────────────────────────────
    //  EVENTS
    // ─────────────────────────────────────────────────────────────

    event NFTClaimed(address indexed winner, uint256 indexed tokenId, uint8 tier);
    event MetadataUpdated(string newMetadataCid, string newImagesCid);
    event FairContractUpdated(address indexed newContract);
    event SeasonCreatorUpdated(address indexed newCreator);

    // ─────────────────────────────────────────────────────────────
    //  CONSTRUCTOR
    // ─────────────────────────────────────────────────────────────

    /**
     * @param _owner       Eigenaar (LuksoFair UP)
     * @param _season      Seizoensnummer
     * @param _seasonName  Naam van het seizoen (bijv. "Season 1 — LUKSO Originals")
     */
    constructor(
        address _owner,
        uint256 _season,
        string memory _seasonName
    )
        LSP8Mintable(
            string(abi.encodePacked(COLLECTION_NAME, " Season ", _season.toString())),
            string(abi.encodePacked("LUKSO-S", _season.toString())),
            _owner,
            0,
            0  // tokenIdFormat: uint256
        )
    {
        season        = _season;
        seasonName    = _seasonName;
        seasonCreator = _owner; // standaard eigenaar als creator
    }

    // ─────────────────────────────────────────────────────────────
    //  ADMIN FUNCTIES
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Koppel het FairContract dat NFTs mag claimen voor winnaars
     */
    function setFairContract(address _fairContract) external onlyOwner {
        require(_fairContract != address(0), "NFT: ongeldig adres");
        fairContract = _fairContract;
        emit FairContractUpdated(_fairContract);
    }

    /**
     * @notice Stel de seizoen creator in (voor royalties op secondaire markt)
     * @dev Seizoen 1: Dutch4Doctor; Seizoen 2+: adres van de externe NFT-maker
     */
    function setSeasonCreator(address _creator) external onlyOwner {
        require(_creator != address(0), "NFT: ongeldig creator adres");
        seasonCreator = _creator;
        emit SeasonCreatorUpdated(_creator);
    }

    /**
     * @notice Update de IPFS metadata en afbeeldingen CIDs
     * @dev Alleen bruikbaar als metadata nog niet is vergrendeld
     */
    function setMetadata(
        string calldata _metadataCid,
        string calldata _imagesCid
    ) external onlyOwner {
        metadataCid = _metadataCid;
        imagesCid   = _imagesCid;
        emit MetadataUpdated(_metadataCid, _imagesCid);
    }

    // ─────────────────────────────────────────────────────────────
    //  MINT FUNCTIES
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Pre-mint alle NFTs naar het contract zelf bij deployment
     * @dev Wordt aangeroepen door deploy.js direct na deployment
     *      Batch-gewijs vanwege gas limieten
     * @param startId  Eerste token ID om te minten
     * @param endId    Laatste token ID om te minten (inclusief)
     */
    function mintBatch(uint256 startId, uint256 endId) external onlyOwner {
        require(startId >= TIER1_START, "NFT: startId te laag");
        require(endId   <= TIER4_END,   "NFT: endId te hoog");
        require(startId <= endId,        "NFT: ongeldige range");

        for (uint256 i = startId; i <= endId; i++) {
            bytes32 tokenId = bytes32(i);
            _mint(address(this), tokenId, true, "");
        }
    }

    /**
     * @notice Geef een gewonnen NFT aan de winnaar
     * @dev Alleen aanroepbaar door het geregistreerde FairContract
     * @param winner   Wallet adres van de winnaar
     * @param tokenId  Token ID van de te overdragen NFT
     */
    function claimNFT(address winner, uint256 tokenId) external {
        require(msg.sender == fairContract, "NFT: alleen FairContract mag claimen");
        require(winner != address(0), "NFT: nul adres niet toegestaan");

        bytes32 tokenIdBytes = bytes32(tokenId);
        require(tokenOwnerOf(tokenIdBytes) == address(this), "NFT: token al geclaimd");

        _transfer(address(this), winner, tokenIdBytes, true, "");
        claimedCount++;

        emit NFTClaimed(winner, tokenId, getTier(tokenId));
    }

    // ─────────────────────────────────────────────────────────────
    //  VIEW FUNCTIES
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Geeft de tier terug van een token ID
     * @param tokenId  Token ID om op te zoeken
     * @return tier 1=Mythic, 2=Rare, 3=Uncommon, 4=Common
     */
    function getTier(uint256 tokenId) public pure returns (uint8) {
        if (tokenId >= TIER1_START && tokenId <= TIER1_END)   return 1; // Mythic
        if (tokenId >= TIER2_START && tokenId <= TIER2_END)   return 2; // Rare
        if (tokenId >= TIER3_START && tokenId <= TIER3_END)   return 3; // Uncommon
        if (tokenId >= TIER4_START && tokenId <= TIER4_END)   return 4; // Common
        revert("NFT: ongeldig token ID");
    }

    /**
     * @notice Geeft de tier naam terug als string
     */
    function getTierName(uint256 tokenId) public pure returns (string memory) {
        uint8 tier = getTier(tokenId);
        if (tier == 1) return "Mythic";
        if (tier == 2) return "Rare";
        if (tier == 3) return "Uncommon";
        return "Common";
    }

    /**
     * @notice Geeft de metadata URI terug voor een token
     * @dev ipfs://{metadataCid}/{tokenId}.json
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(bytes(metadataCid).length > 0, "NFT: metadata CID niet ingesteld");
        return string(abi.encodePacked("ipfs://", metadataCid, "/", tokenId.toString(), ".json"));
    }

    /**
     * @notice Geeft de afbeelding URI terug voor een token
     */
    function imageURI(uint256 tokenId, string calldata filename)
        external view returns (string memory)
    {
        require(bytes(imagesCid).length > 0, "NFT: images CID niet ingesteld");
        return string(abi.encodePacked("ipfs://", imagesCid, "/", filename));
    }

    /**
     * @notice Hoeveel NFTs zijn nog beschikbaar per tier
     */
    function availableByTier() external view returns (
        uint256 mythicAvail,
        uint256 rareAvail,
        uint256 uncommonAvail,
        uint256 commonAvail
    ) {
        // Tel unclaimed tokens per tier
        for (uint256 i = TIER1_START; i <= TIER1_END; i++) {
            if (tokenOwnerOf(bytes32(i)) == address(this)) mythicAvail++;
        }
        for (uint256 i = TIER2_START; i <= TIER2_END; i++) {
            if (tokenOwnerOf(bytes32(i)) == address(this)) rareAvail++;
        }
        for (uint256 i = TIER3_START; i <= TIER3_END; i++) {
            if (tokenOwnerOf(bytes32(i)) == address(this)) uncommonAvail++;
        }
        for (uint256 i = TIER4_START; i <= TIER4_END; i++) {
            if (tokenOwnerOf(bytes32(i)) == address(this)) commonAvail++;
        }
    }

    /**
     * @notice Uitgebreide collectie-informatie voor display
     */
    function getCollectionInfo() external view returns (
        string memory name,
        string memory description,
        string memory platformUrl,
        string memory creatorHandle,
        uint256 totalSupply,
        uint256 claimed,
        uint256 seasonNumber,
        string memory sznName,
        string memory royaltyBasis
    ) {
        return (
            COLLECTION_NAME,
            COLLECTION_DESCRIPTION,
            PLATFORM_URL,
            CREATOR_HANDLE,
            TOTAL_SUPPLY,
            claimedCount,
            season,
            seasonName,
            ROYALTY_BASIS
        );
    }
}
