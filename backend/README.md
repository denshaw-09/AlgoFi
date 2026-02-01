# AlgoFi Backend Setup

This folder contains the backend API service for the AlgoFi NFT Marketplace.

---

## Tech Stack

- Node.js
- Express.js
- Algorand SDK
- dotenv
- CORS

---

## Prerequisites

- Node.js v16+
- npm
- Algorand TestNet Account

---

## Installation Steps

Navigate to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables Setup

Create `.env` file:

```bash
cp .env.example .env
```

Fill required values.

---

### Example .env Configuration

```env
PORT=5000
ALGOD_SERVER=https://testnet-api.algonode.cloud
APP_ID=YOUR_APP_ID
PLATFORM_WALLET=YOUR_WALLET_ADDRESS
PLATFORM_FEE=5
```

---

## Running Backend Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

## Server URL

```
http://localhost:5000
```

---

## Important Notes

- Do not commit `.env` file
- Use Algorand TestNet for development
- Never expose private keys
