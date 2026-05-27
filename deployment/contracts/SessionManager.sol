// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

// ============================================================
//  LUKSO Fair — Session Manager
//  Versie: 1.0.0
//
//  Dit contract beheert speeltegoeden voor LUKSO Fair.
//  Spelers storten eenmalig een sessiebudget en kunnen dan
//  automatisch spinnen zonder per spin te hoeven goedkeuren.
//
//  Flow:
//  1. Speler roept startSession(amount) aan met LYX
//  2. LYX wordt vastgehouden als speeltegoed
//  3. LUKSO Fair contract trekt 0.1 LYX per spin af
//  4. Speler roept endSession() aan om ongebruikt tegoed terug te krijgen
// ============================================================

interface ILUKSOFair {
    function spinFromSession(address player, bool isFreeSpin) external returns (uint8 r1, uint8 r2, uint8 r3, uint8 prizeType);
}

contract SessionManager {

    // ── Constanten ─────────────────────────────────────────────
    uint256 public constant SPIN_COST = 0.1 ether;

    // ── Adressen ───────────────────────────────────────────────
    address public fairContract;
    address public owner;

    // ── Sessie struct ──────────────────────────────────────────
    struct Session {
        uint256 balance;      // huidig speeltegoed in LYX
        uint256 totalDeposit; // totaal gestort bij start sessie
        bool    active;       // sessie actief?
        uint256 startTime;    // timestamp start
    }

    // ── State ──────────────────────────────────────────────────
    mapping(address => Session) public sessions;

    // ── Events ─────────────────────────────────────────────────
    event SessionStarted(address indexed player, uint256 amount);
    event SessionEnded(address indexed player, uint256 refund);
    event SpinPaid(address indexed player, uint256 cost, uint256 remaining);
    event TopUp(address indexed player, uint256 amount);

    // ── Constructor ────────────────────────────────────────────
    constructor(address _fairContract) {
        fairContract = _fairContract;
        owner        = msg.sender;
    }

    // ── Modifiers ──────────────────────────────────────────────
    modifier onlyOwner() {
        require(msg.sender == owner, "SM: alleen owner");
        _;
    }

    modifier onlyFair() {
        require(msg.sender == fairContract, "SM: alleen fair contract");
        _;
    }

    // ── Speler functies ────────────────────────────────────────

    /**
     * @dev Start een sessie met een speeltegoed.
     *      Speler stuurt LYX mee — dit wordt het speelbudget.
     *      Minimum: 0.1 LYX (genoeg voor 1 spin)
     */
    function startSession() external payable {
        require(msg.value >= SPIN_COST, "SM: minimum 0.1 LYX");

        Session storage s = sessions[msg.sender];

        if (s.active) {
            // Sessie al actief — voeg toe als top-up
            s.balance      += msg.value;
            s.totalDeposit += msg.value;
            emit TopUp(msg.sender, msg.value);
        } else {
            // Nieuwe sessie
            sessions[msg.sender] = Session({
                balance:      msg.value,
                totalDeposit: msg.value,
                active:       true,
                startTime:    block.timestamp
            });
            emit SessionStarted(msg.sender, msg.value);
        }
    }

    /**
     * @dev Beëindig sessie en ontvang ongebruikt tegoed terug.
     */
    function endSession() external {
        Session storage s = sessions[msg.sender];
        require(s.active, "SM: geen actieve sessie");

        uint256 refund = s.balance;
        s.balance      = 0;
        s.active       = false;

        if (refund > 0) {
            (bool ok, ) = msg.sender.call{value: refund}("");
            require(ok, "SM: refund mislukt");
        }

        emit SessionEnded(msg.sender, refund);
    }

    /**
     * @dev Controleer of speler genoeg tegoed heeft voor een spin.
     */
    function canSpin(address player) external view returns (bool) {
        Session storage s = sessions[player];
        return s.active && s.balance >= SPIN_COST;
    }

    /**
     * @dev Huidig sessietegoed van een speler.
     */
    function sessionBalance(address player) external view returns (uint256) {
        return sessions[player].balance;
    }

    /**
     * @dev Is er een actieve sessie?
     */
    function hasActiveSession(address player) external view returns (bool) {
        return sessions[player].active;
    }

    // ── Fair contract functies ──────────────────────────────────

    /**
     * @dev Trek 0.1 LYX af voor een spin.
     *      Alleen aanroepbaar door het fair contract.
     *      Stuurt de LYX door naar het fair contract.
     */
    function deductSpin(address player) external returns (bool) {
        require(
            msg.sender == fairContract || msg.sender == player,
            "SM: geen toegang"
        );
        Session storage s = sessions[player];
        require(s.active,              "SM: geen actieve sessie");
        require(s.balance >= SPIN_COST, "SM: onvoldoende tegoed");

        s.balance -= SPIN_COST;

        // Stuur 0.1 LYX door naar het fair contract voor verdeling
        (bool ok, ) = fairContract.call{value: SPIN_COST}("");
        require(ok, "SM: betaling aan fair mislukt");

        emit SpinPaid(player, SPIN_COST, s.balance);
        return true;
    }

    // ── Owner functies ──────────────────────────────────────────

    function setFairContract(address _fairContract) external onlyOwner {
        fairContract = _fairContract;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    receive() external payable {}
}
