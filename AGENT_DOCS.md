# LUKSO Fair — Agent Documentation

## 🤖 For Autonomous Agents

LUKSO Fair is fully compatible with autonomous agents built on LUKSO Universal Profiles.
This document explains how agents like **LUKSOAgent** can interact with LUKSO Slots.

---

## Quick Start

LUKSO Fair exposes a global `window.LUKSOFairAPI` object that agents can use directly.

```javascript
// 1. Connect your Universal Profile
await window.LUKSOFairAPI.connect();

// 2. Check current state
const state = window.LUKSOFairAPI.getState();
console.log('Balance:', state.balance, 'LYX');
console.log('Free spins:', state.freeSpins);

// 3. Spin!
const result = await window.LUKSOFairAPI.spin();

// 4. Use free spins if available
if (state.freeSpins > 0) {
  await window.LUKSOFairAPI.freeSpin();
}

// 5. Collect winnings
await window.LUKSOFairAPI.claim();
```

---

## Contract Details

| Contract | Address |
|---|---|
| LUKSOFair (main) | `0x75227Dc417427830aCF3250f949AbD1a8253fA21` |
| LuksoFairNFT | `0x530BEd9af5D96C21C73f43B948d6BD9ff70b24Cc` |
| SPINToken | `0x3E56E8b24cc8E85C1B36e26cBd356C1238f823f7` |
| Network | LUKSO Mainnet (Chain ID: 42) |
| RPC | `https://rpc.mainnet.lukso.network` |

---

## Token Addresses in Prize Pool

| Token | Address | Creator |
|---|---|---|
| sLYX | `0x8a3982f0a7d154d11a5f43eec7f50e52ebbc8f7d` | LUKSO |
| PHLAME | `0xf02198baa1245b602d6acd4d352b4e98d319d6ea` | Phlamey Protocol |
| AGENTPO | `0x47568bc4dc7fee1bb67f741ba927e2904b61f016` | LUKSOAgent (@jordydutch) |

---

## Game Rules

- **Spin cost:** 0.1 LYX per spin
- **Free spins:** Earned by matching symbols or holding SPIN tokens (1 token = 10 free spins)
- **Network:** LUKSO Mainnet only

## Prize Table — 3× Same Symbol

| Symbol | Prize |
|---|---|
| 3× LUKSO | 🏆 Mythic NFT (1/1) |
| 3× UP | ⭐ Rare NFT |
| 3× Emmet | 🎴 Uncommon NFT |
| 3× Elyx | 🎴 Common NFT |
| 3× Phlamey | 🔥 PHLAME tokens |
| 3× Agent | 🤖 AGENTPO tokens |
| 3× sLYX | 💎 sLYX tokens |
| 3× Bills | 💰 0.20 LYX |
| 3× Coins | 💰 0.05 LYX |
| 3× Free Spins | 🎟️ 5 free spins |

## Prize Table — 2× Same Symbol

| Symbol | Prize |
|---|---|
| 2× Free Spins | 🎟️ 3 free spins |
| 2× Any other | 🎟️ 1 free spin |

---

## Event Listeners

Agents can listen to game events:

```javascript
// Listen for any spin result
window.LUKSOFairAPI.onSpinResult = (state) => {
  console.log('Spin complete!', state.session);
};

// Listen for NFT wins
window.LUKSOFairAPI.onNFTWon = (nft) => {
  console.log('NFT won!', nft.tier, nft.id);
};
```

---

## Direct Contract Interaction

Agents can also interact directly with the smart contract via ethers.js or viem:

```javascript
// Minimal ABI for agents
const LUKSO_FAIR_ABI = [
  "function spin(bytes32 commitHash) external payable",
  "function revealSpin(uint256 secret) external",
  "function claimWinnings() external",
  "function getPoolStatus() external view returns (uint256, uint256, uint256, uint256)",
  "function spinCost() external view returns (uint256)",
];

const contract = new ethers.Contract(
  '0x75227Dc417427830aCF3250f949AbD1a8253fA21',
  LUKSO_FAIR_ABI,
  signer
);

// Get pool status
const [mythic, rare, uncommon, common] = await contract.getPoolStatus();
console.log(`NFTs available — Mythic: ${mythic}, Rare: ${rare}, Uncommon: ${uncommon}, Common: ${common}`);
```

---

## NFT Collection — Season 1

**Collection:** LUKSO Fair Prizes Season 1
**Total:** 300 NFTs across 4 tiers

| Tier | Supply | Artworks | Per Artwork |
|---|---|---|---|
| Mythic | 5 | 5 | 1/1 |
| Rare | 20 | 5 | 4 editions |
| Uncommon | 75 | 5 | 15 editions |
| Common | 200 | 8 | 25 editions |

**Images IPFS:** `bafybeicr5g7jexfkaetxisu5paoqc2luiooi37rf7gybs6bja7hiofm354`
**Metadata IPFS:** `bafybeifa2n5t5ccmzswspzx5aq2gml66dqzak6zdgnbgj7hn3iklicxx2u`

---

## About LUKSO Fair

LUKSO Fair is a community-driven blockchain carnival built on LUKSO.
Play games, win unique NFTs, tokens and LYX.

- **Platform:** https://profile.link/lukso-fair@fBC4
- **Built by:** @Dutch4Doctor
- **AGENTPO** is the first token created by **LUKSOAgent** (@jordydutch) — 
  a founding community member of LUKSO Fair!

*More games, a prize shop and a community token coming soon.*

