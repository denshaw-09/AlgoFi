# AlgoFi 🎨🎵

## **Table of Contents**

1. [Overview](#algofi-)
2. [Features](#features)
3. [Tech Stack](#tech-stack)

   * [Frontend](#frontend)
   * [Backend](#backend)
   * [Smart Contract](#smart-contract)
4. [Project Structure](#project-structure)
5. [Installation](#installation)

   * [Prerequisites](#prerequisites)
   * [Backend Setup](#backend-setup)
   * [Frontend Setup](#frontend-setup)
   * [Smart Contract Deployment](#smart-contract-deployment)
6. [Usage](#usage)

   * [For Creators](#for-creators)
   * [For Collectors](#for-collectors)
7. [API Endpoints](#api-endpoints)

   * [NFT Operations](#nft-operations)
   * [Transaction Operations](#transaction-operations)
   * [Marketplace](#marketplace)
8. [Smart Contract Functions](#smart-contract-functions)
9. [Testing](#testing)
10. [Security Considerations](#security-considerations)
11. [Troubleshooting](#troubleshooting)
12. [Future Enhancements](#future-enhancements)
13. [Resources](#resources)
14. [License](#license)
15. [Contributing](#contributing)
16. [Support](#support)

---


# AlgoFi 🎨🎵

A decentralized NFT marketplace on the Algorand testnet where creators can mint, showcase, and distribute a wide range of NFTs including art, music, and standard digital collectibles.

## Features

- **Multi-Type NFT Support**: Mint art NFTs, music NFTs, and standard digital collectibles
- **Purchasable & Non-Purchasable NFTs**: Support for both tradeable assets and free collectibles
- **Integrated Marketplace**: Browse, buy, and sell NFTs seamlessly
- **Portfolio Management**: View and manage your NFT collection
- **Secure Wallet Integration**: Connect using Pera Wallet
- **Low Fees**: Built on Algorand with minimal transaction costs (~0.001 ALGO)
- **Fast Transactions**: 4.5-second finality

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Router
- Axios
- Pera Wallet Connect
- Algorand SDK

### Backend
- Node.js
- Express.js
- Algorand SDK
- CORS

### Smart Contract
- PyTeal (Algorand Smart Contracts)
- Algorand TestNet

## Project Structure

```
algomint/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── nftController.js
│   │   ├── routes/
│   │   │   └── nftRoutes.js
│   │   └── services/
│   │       └── algorandService.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── MintForm.js
│   │   │   └── NFTCard.js
│   │   ├── views/
│   │   │   ├── Home.js
│   │   │   ├── Marketplace.js
│   │   │   └── Portfolio.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
└── smart_contracts/
    └── algomint_contract.py
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Python 3.7+ (for smart contract compilation)
- Algorand TestNet account
- Pera Wallet (mobile or browser extension)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` file:
```
PORT=5000
ALGOD_SERVER=https://testnet-api.algonode.cloud
APP_ID=YOUR_APP_ID_AFTER_DEPLOYMENT
PLATFORM_WALLET=YOUR_PLATFORM_WALLET_ADDRESS
PLATFORM_FEE=5
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS:
```bash
npx tailwindcss init -p
```

4. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ALGOD_SERVER=https://testnet-api.algonode.cloud
REACT_APP_APP_ID=YOUR_APP_ID_AFTER_DEPLOYMENT
REACT_APP_NETWORK=testnet
```

5. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Smart Contract Deployment

1. Install PyTeal:
```bash
pip install pyteal
```

2. Navigate to the smart contracts directory:
```bash
cd smart_contracts
```

3. Compile the contract:
```bash
python algomint_contract.py
```

This generates `approval.teal` and `clear.teal` files.

4. Deploy to Algorand TestNet using the Algorand SDK or `goal` CLI:
```bash
# Example using goal
goal app create --creator YOUR_ADDRESS \
  --approval-prog approval.teal \
  --clear-prog clear.teal \
  --global-byteslices 1 \
  --global-ints 3 \
  --local-byteslices 5 \
  --local-ints 2
```

5. Update `APP_ID` in both backend and frontend `.env` files with the deployed application ID.

## Usage

### For Creators

1. **Connect Wallet**: Click "Connect Wallet" and select Pera Wallet
2. **Mint NFT**:
   - Go to Home page
   - Fill in the mint form
   - Upload your file (image, audio, etc.)
   - Choose NFT type (Art, Music, or Standard)
   - Set as purchasable or non-purchasable
   - If purchasable, set your price
   - Click "Mint NFT" and sign the transaction
3. **Manage Portfolio**: Visit the Portfolio page to view your created NFTs

### For Collectors

1. **Connect Wallet**: Connect your Pera Wallet
2. **Browse Marketplace**: Explore available NFTs
3. **Filter & Search**: Use filters to find specific types of NFTs
4. **Purchase NFT**: Click "Buy Now" on any listed NFT and confirm the transaction
5. **View Collection**: Check your Portfolio to see owned NFTs

## API Endpoints

### NFT Operations
- `POST /api/nfts/mint` - Create mint transaction
- `POST /api/nfts/list` - Create list transaction
- `POST /api/nfts/buy` - Create buy transaction
- `GET /api/nfts/details/:assetId` - Get NFT details
- `GET /api/nfts/account/:address` - Get account NFTs

### Transaction Operations
- `POST /api/nfts/submit` - Submit signed transaction
- `POST /api/nfts/opt-in` - Create opt-in transaction

### Marketplace
- `GET /api/nfts/marketplace` - Get marketplace listings

## Smart Contract Functions

- `initialize` - Initialize the marketplace contract
- `mint_nft` - Mint a new NFT
- `list_nft` - List NFT for sale
- `buy_nft` - Purchase an NFT
- `update_price` - Update listing price
- `delist_nft` - Remove NFT from marketplace

## Testing

### Get TestNet ALGO

Visit the [Algorand TestNet Dispenser](https://bank.testnet.algorand.network/) to fund your wallet with test ALGO.

### Test the Application

1. Mint a test NFT
2. List it on the marketplace
3. Use a second wallet to purchase it
4. Verify transactions on [Algorand TestNet Explorer](https://testnet.algoexplorer.io/)

## Security Considerations

- Never commit `.env` files to version control
- Use strong wallet passwords
- Verify all transactions before signing
- This is a testnet application - do not use mainnet credentials
- Platform fees are set to 2.5% (250 basis points)

## Troubleshooting

### Wallet Connection Issues
- Ensure Pera Wallet extension is installed
- Check that you're on the TestNet network
- Clear browser cache and reconnect

### Transaction Failures
- Verify you have sufficient ALGO for fees
- Check that APP_ID is correctly configured
- Ensure wallet is opted into the application

### Backend Connection Issues
- Verify backend server is running on port 5000
- Check CORS configuration
- Ensure API_URL in frontend .env matches backend URL

## Future Enhancements

- IPFS integration for decentralized file storage
- Royalty system for secondary sales
- Auction functionality
- Collection creation
- Social features (likes, comments, follows)
- Mobile app using React Native
- Mainnet deployment

## Resources

- [Algorand Documentation](https://developer.algorand.org/)
- [PyTeal Documentation](https://pyteal.readthedocs.io/)
- [Pera Wallet](https://perawallet.app/)
- [Algorand TestNet Explorer](https://testnet.algoexplorer.io/)
- [Algorand TestNet Dispenser](https://bank.testnet.algorand.network/)

## License

MIT License

## Contributing

Contributions are welcome! 
Please read our [Contributing Guidelines](Contributions.md) before submitting a Pull Request.

For discussions, questions, or onboarding help, join us on **Discord**:  
  👉 **Discord:** <DISCORD_LINK>(https://discord.gg/VcbbKWC9Xc)

## Support

If you need help or have questions:

- Open an issue on the GitHub repository
- Join our community on **Discord** for discussions and contributor support.

---

## Summary

This PR improves contributor onboarding and communication by:

- Adding the official Discord link to the Contributing Guidelines and README
- Clarifying how contributors should use Discord, GitHub Issues, and Discussions
- Improving wording and structure in the Community & Communication section
- Updating the Code of Conduct contact section for better clarity

## Motivation

Discord provides a faster and more collaborative environment for contributors.
This change helps new contributors know where to ask questions and engage with the community while ensuring all interactions follow the Code of Conduct.

## Checklist

- [x] Documentation updated
- [x] No breaking changes
- [x] Follows project guidelines


Built with ❤️ on Algorand