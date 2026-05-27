// ╔══════════════════════════════════════════════════════════════╗
// ║            LUKSO Fair — Deployment Script v2.0              ║
// ╚══════════════════════════════════════════════════════════════╝
//
// Gebruik:
//   npm run deploy:testnet   → deployt op LUKSO testnet
//   npm run deploy:mainnet   → deployt op LUKSO mainnet
//
// Vereisten:
//   .env bestand met PRIVATE_KEY (zonder 0x prefix)
//
// Na deployment:
//   1. Kopieer de contractadressen naar de frontend (index.html)
//   2. Stuur startinleg tokens naar het LUKSOFair contract
//   3. Roep recordDeposit() aan
//   4. Stel Gelato keeper in via setGelatoKeeper()
//   5. Stel metadata CIDs in via nftContract.setMetadata()

const { ethers } = require("hardhat");
require("dotenv").config();

// ── IPFS Metadata CIDs (van Pinata) ────────────────────────────
const METADATA_CID = "bafybeicr5g7jexfkaetxisu5paoqc2luiooi37rf7gybs6bja7hiofm354"; // images
// Metadata JSON CID stel je in na upload via setMetadata()

// ── Vaste adressen ──────────────────────────────────────────────
const LUKSO_FAIR_UP   = "0xfBC4ba2bBC9213595fd455A1d49a42CAeDFD0123";
const DUTCH4DOCTOR_UP = "0xF8b8a4094165ba4f6d225f593392c04765FC6409";

async function main() {
  const [deployer] = await ethers.getSigners();
  const network    = (await ethers.provider.getNetwork()).name;
  const balance    = await ethers.provider.getBalance(deployer.address);
  const isMainnet  = network.toLowerCase().includes("mainnet");

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log(`║  Deploying op: ${network.padEnd(44)}║`);
  console.log(`║  Deployer:     ${deployer.address.substring(0,44)}║`);
  console.log(`║  Balance:      ${ethers.formatEther(balance).substring(0,8)} LYX${' '.repeat(37)}║`);
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  if (isMainnet && parseFloat(ethers.formatEther(balance)) < 3) {
    console.error("❌ Te weinig LYX voor mainnet deployment (min. 3 LYX aanbevolen)");
    process.exit(1);
  }

  // ── 1. Deploy SPINToken ──────────────────────────────────────
  console.log("1. SPINToken deployen...");
  const SPINToken = await ethers.getContractFactory("SPINToken");
  const spinToken = await SPINToken.deploy(deployer.address);
  await spinToken.waitForDeployment();
  const spinAddr  = await spinToken.getAddress();
  console.log(`   ✅ SPINToken: ${spinAddr}`);

  // ── 2. Deploy LuksoFairNFT ───────────────────────────────────
  console.log("\n2. LuksoFairNFT deployen (Seizoen 1)...");
  const LuksoFairNFT = await ethers.getContractFactory("LuksoFairNFT");
  const nftContract  = await LuksoFairNFT.deploy(
    deployer.address,
    1,
    "Season 1 — LUKSO Originals"
  );
  await nftContract.waitForDeployment();
  const nftAddr = await nftContract.getAddress();
  console.log(`   ✅ LuksoFairNFT: ${nftAddr}`);

  // ── 3. Deploy LUKSOFair hoofdcontract ────────────────────────
  console.log("\n3. LUKSOFair hoofdcontract deployen...");
  const LUKSOFair    = await ethers.getContractFactory("LUKSOFair");
  const fairContract = await LUKSOFair.deploy();
  await fairContract.waitForDeployment();
  const fairAddr = await fairContract.getAddress();
  console.log(`   ✅ LUKSOFair: ${fairAddr}`);

  // ── 4. Contracten aan elkaar koppelen ────────────────────────
  console.log("\n4. Contracten configureren...");

  // Token adressen (placeholders voor testnet)
  const SLYX_ADDR    = isMainnet
    ? "0x8A3982f0A7D154d11a5f43eEc7F50E52eBbC8F7D"
    : "0x0000000000000000000000000000000000000001"; // testnet placeholder
  const PHLAME_ADDR  = isMainnet
    ? "0xF02198BAa1245B602d6acD4d352b4E98D319D6Ea"
    : "0x0000000000000000000000000000000000000002";
  const AGENTPO_ADDR = isMainnet
    ? "0x47568bC4dc7fEE1BB67F741Ba927E2904b61F016"
    : "0x0000000000000000000000000000000000000003";

  await fairContract.setContracts(spinAddr, nftAddr, SLYX_ADDR, PHLAME_ADDR, AGENTPO_ADDR);
  console.log("   ✅ setContracts() geslaagd");

  await nftContract.setFairContract(fairAddr);
  console.log("   ✅ setFairContract() geslaagd (NFT)");

  await spinToken.setFairContract(fairAddr);
  console.log("   ✅ setFairContract() geslaagd (SPIN)");

  // Images CID instellen
  await nftContract.setMetadata("", METADATA_CID);
  console.log("   ✅ Images CID ingesteld");

  // ── 5. NFT pool minten ───────────────────────────────────────
  console.log("\n5. NFT pool minten (300 NFTs)...");

  // Tier 1 — Mythic (5 NFTs, tokenId 1-5)
  console.log("   Tier 1 — Mythic (5 NFTs)...");
  await nftContract.mintBatch(1, 5);
  console.log("   ✅ Tier 1 gemint");

  // Tier 2 — Rare (20 NFTs, tokenId 6-25)
  console.log("   Tier 2 — Rare (20 NFTs)...");
  await nftContract.mintBatch(6, 25);
  console.log("   ✅ Tier 2 gemint");

  // Tier 3 — Uncommon (75 NFTs, tokenId 26-100)
  console.log("   Tier 3 — Uncommon (75 NFTs)...");
  await nftContract.mintBatch(26, 75);
  await nftContract.mintBatch(76, 100);
  console.log("   ✅ Tier 3 gemint");

  // Tier 4 — Common (200 NFTs, tokenId 101-300, in batches van 50)
  console.log("   Tier 4 — Common (200 NFTs in 4 batches)...");
  await nftContract.mintBatch(101, 150);
  console.log("   Batch 1/4 ✅");
  await nftContract.mintBatch(151, 200);
  console.log("   Batch 2/4 ✅");
  await nftContract.mintBatch(201, 250);
  console.log("   Batch 3/4 ✅");
  await nftContract.mintBatch(251, 300);
  console.log("   Batch 4/4 ✅");
  console.log("   ✅ Tier 4 volledig gemint");

  // ── 6. Ownership overdragen aan LUKSO Fair UP ──────────────
  console.log("\n6. Ownership overdragen aan LUKSO Fair UP...");
  await nftContract.transferOwnership(LUKSO_FAIR_UP);
  console.log("   ✅ NFT ownership → LUKSO Fair UP");
  await spinToken.transferOwnership(LUKSO_FAIR_UP);
  console.log("   ✅ SPIN ownership → LUKSO Fair UP");
  await fairContract.transferOwnership(LUKSO_FAIR_UP);
  console.log("   ✅ Fair ownership → LUKSO Fair UP");

  // ── DEPLOYMENT SAMENVATTING ──────────────────────────────────
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║  ✅ DEPLOYMENT GESLAAGD!                                  ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log(`║  SPINToken:    ${spinAddr}  ║`);
  console.log(`║  LuksoFairNFT: ${nftAddr}  ║`);
  console.log(`║  LUKSOFair:    ${fairAddr}  ║`);
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log("║  VOLGENDE STAPPEN:                                        ║");
  console.log("║  1. Update contractadressen in index.html of              ║");
  console.log("║     index-testnet.html                                    ║");
  console.log("║  2. Stuur startinleg naar het LUKSOFair contract:         ║");
  console.log("║     - 100 sLYX                                            ║");
  console.log("║     - 200.000 PHLAME                                      ║");
  console.log("║     - 5.000 AGENTPO                                       ║");
  console.log("║  3. Roep recordDeposit() aan (no-rugpull)                 ║");
  console.log("║  4. Stel Gelato keeper in via setGelatoKeeper()           ║");
  console.log("║  5. Stel metadata JSON CID in via nftContract.setMetadata ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Sla adressen op in een bestand voor gemakkelijke referentie
  const fs = require("fs");
  const deployInfo = {
    network,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      SPINToken:    spinAddr,
      LuksoFairNFT: nftAddr,
      LUKSOFair:    fairAddr,
    },
    constants: {
      PLATFORM_UP:   LUKSO_FAIR_UP,
      CREATOR_UP:    DUTCH4DOCTOR_UP,
      SLYX:          SLYX_ADDR,
      PHLAME:        PHLAME_ADDR,
      AGENTPO:       AGENTPO_ADDR,
    }
  };
  fs.writeFileSync(
    `deployment-${network}-${Date.now()}.json`,
    JSON.stringify(deployInfo, null, 2)
  );
  console.log(`📄 Deployment info opgeslagen in deployment-${network}-*.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment mislukt:", error);
    process.exit(1);
  });
