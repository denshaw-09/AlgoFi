# Smart Contracts — AlgoFi NFT Marketplace

This folder contains the **PyTeal smart contracts** that power the NFT minting and marketplace logic on **Algorand**. The contracts manage NFT creation, listing, pricing, and secure purchases with platform fees.

---

## Overview

* **Language:** PyTeal
* **Chain:** Algorand
* **Contract Type:** Application (Stateful Smart Contract)
* **Artifacts Generated:** `approval.teal`, `clear.teal`

The contract stores NFT metadata in **local state** and marketplace configuration in **global state**.

---

## Files

* `approval_program.py` – Main application logic (mint, list, buy, update, delist)
* `approval.teal` – Compiled approval program
* `clear.teal` – Clear-state program (always approves)

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

### 1 Initialize

**Signature:** `initialize()`

* Sets the contract owner
* Initializes NFT counter
* Sets default platform fee (2.5%)

---

### 2 Mint NFT

**Signature:** `mint_nft(name, type, purchasable, price)`

* Creates a new NFT
* Validates NFT type and price
* Stores metadata in creator’s local state
* Increments global NFT count

---

### 3 List NFT

**Signature:** `list_nft(price)`

* Lists an owned NFT for sale
* Only the creator can list
* Requires a valid, non-zero price

---

### 4 Buy NFT

**Signature:** `buy_nft(seller_address)`

* Purchases a listed NFT
* Requires grouped payment transactions:

  * Payment to seller
  * Platform fee to owner
* Transfers NFT metadata to buyer
* Clears seller’s local state

---

### 5 Update Price

**Signature:** `update_price(new_price)`

* Updates listing price
* Only creator can update
* NFT must be purchasable

---

### 6 Delist NFT

**Signature:** `delist_nft()`

* Removes NFT from sale
* Resets price to `0`
* Creator-only action

---

## Security & Validation

* Creator-only checks for listing and updates
* Strict transaction group validation for purchases
* Platform fee enforced at protocol level
* No private keys or secrets stored in contract

---

## Clear State Program

`clear_state_program()` always approves, allowing users to safely clear local state when required.

---

##  Compilation

Run the script to compile PyTeal → TEAL:

```bash
python approval_program.py
```

Outputs:

* `approval.teal`
* `clear.teal`

---

## Note

This documentation explains contract logic for **understanding and contribution purposes only**. Always audit and test contracts thoroughly before deploying to mainnet.     
