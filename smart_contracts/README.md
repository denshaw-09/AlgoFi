# Smart Contracts — AlgoFi NFT Marketplace

This folder contains the smart contract logic used by the AlgoFi NFT marketplace on Algorand.  
It handles NFT listing, pricing, ownership transfer, and marketplace rules.

---

## Overview

* **Chain:** Algorand
* **Contract Type:** Application (Stateful Smart Contract)

The contract stores NFT metadata in **local state** and marketplace configuration in **global state**.

---

## Files

* `approval.teal` – Approval program logic
* `clear.teal` – Clear-state program (always approves)
* `deploy.py` – Deployment script for the smart contract

---

## Global State

| Key            | Description                                     |
| -------------- | ----------------------------------------------- |
| `owner`        | Marketplace owner address                       |
| `nft_count`    | Total NFTs minted                               |
| `platform_fee` | Platform fee (basis points, e.g., `250` = 2.5%) |

---

## Local State (per NFT holder)

| Key           | Description                           |
| ------------- | ------------------------------------- |
| `creator`     | NFT creator/owner                     |
| `name`        | NFT name                              |
| `type`        | NFT type (`art`, `music`, `standard`) |
| `purchasable` | Whether NFT can be sold (0/1)         |
| `price`       | Listing price (0 if not listed)       |

---

## Supported Operations

Each operation is triggered via `Txn.application_args[0]`.

### Initialize
Sets the contract owner, initializes the NFT counter, and sets the platform fee.

### Mint NFT
Creates a new NFT and stores metadata in local state.

### List NFT
Lists an owned NFT for sale with a valid price.

### Buy NFT
Purchases a listed NFT using grouped payment transactions and applies the platform fee.

### Update Price
Updates the price of a listed NFT.

### Delist NFT
Removes an NFT from sale.

---

## Security & Validation

* Creator-only checks for listing and updates
* Strict transaction group validation for purchases
* Platform fee enforced at protocol level
* No private keys or secrets stored in the contract

---

## Deployment

To deploy the smart contract:

```bash
python deploy.py
