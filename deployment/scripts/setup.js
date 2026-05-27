const { ethers } = require("hardhat");
require("dotenv").config();

// ── Contract adressen mainnet ───────────────────────────────────
const FAIR_CONTRACT  = "0x75227Dc417427830aCF3250f949AbD1a8253fA21";

// ── Startinleg bedragen ─────────────────────────────────────────
const SLYX_AMOUNT    = ethers.parseUnits("100",    18); // 100 sLYX
const PHLAME_AMOUNT  = ethers.parseUnits("200000", 18); // 200.000 PHLAME
const AGENTPO_AMOUNT = ethers.parseUnits("5000",   18); // 5.000 AGENTPO

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Setup met adres:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "LYX\n");

  const fair = await ethers.getContractAt("LUKSOFair", FAIR_CONTRACT);

  // ── 1. recordDeposit aanroepen ──────────────────────────────
  console.log("1. Startinleg registreren (recordDeposit)...");
  const tx = await fair.recordDeposit(
    SLYX_AMOUNT,
    PHLAME_AMOUNT,
    AGENTPO_AMOUNT,
    { value: 0 } // geen LYX startinleg
  );
  await tx.wait();
  console.log("   ✅ Startinleg geregistreerd! Tx:", tx.hash);

  console.log("\n════════════════════════════════════════");
  console.log("✅ Setup compleet!");
  console.log("Volgende stap: Gelato keeper instellen");
  console.log("════════════════════════════════════════");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
