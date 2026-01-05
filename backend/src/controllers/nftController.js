import algorandService from "../services/algorandService.js";

class NFTController {
  /**
   * Get account information and NFTs
   */
  async getAccount(req, res) {
    try {
      const { address } = req.params;

      if (!address) {
        return res.status(400).json({ error: "Address is required" });
      }

      const accountInfo = await algorandService.getAccountInfo(address);
      const appState = await algorandService.getApplicationState(address);

      res.status(200).json({
        success: true,
        data: {
          ...accountInfo,
          nftData: appState,
        },
      });
    } catch (error) {
      console.error("Get account error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Create mint NFT transaction
   */
  async mintNFT(req, res) {
    try {
      const {
        creator,
        name,
        type,
        purchasable,
        price,
        assetName,
        unitName,
        description,
        metadata,
      } = req.body;

      console.log("Mint NFT Request:", {
        creator,
        name,
        type,
        purchasable,
        price,
      });

      // Validation
      if (!creator) {
        return res.status(400).json({
          success: false,
          error: "Creator address is required. Please connect your wallet.",
        });
      }

      if (!name || !type) {
        return res.status(400).json({
          success: false,
          error: "NFT name and type are required fields.",
        });
      }

      if (!["art", "music", "standard"].includes(type)) {
        return res.status(400).json({
          success: false,
          error: "Type must be art, music, or standard",
        });
      }

      if (purchasable && (!price || price <= 0)) {
        return res.status(400).json({
          success: false,
          error: "Price must be greater than 0 for purchasable NFTs",
        });
      }

      // Create NFT asset transaction
      const assetTxn = await algorandService.createNFTAsset({
        creator,
        assetName: assetName || name,
        unitName: unitName || "NFT",
        total: 1,
        decimals: 0,
        url: "", // Will be updated after IPFS upload in production
        metadata: description || metadata || "",
      });

      // Create application call transaction
      const appTxn = await algorandService.createMintTransaction({
        creator,
        name,
        type,
        purchasable: purchasable || false,
        price: price || 0,
        metadata: description || metadata || "",
      });

      console.log("Mint transactions created successfully");

      res.status(200).json({
        success: true,
        data: {
          assetTransaction: assetTxn,
          appTransaction: appTxn,
          message: "Sign both transactions in your wallet",
        },
      });
    } catch (error) {
      console.error("Mint NFT error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Create list NFT transaction
   */
  async listNFT(req, res) {
    try {
      const { seller, price } = req.body;

      if (!seller || !price || price <= 0) {
        return res.status(400).json({
          success: false,
          error: "Seller and valid price are required",
        });
      }

      const transaction = await algorandService.createListTransaction({
        seller,
        price,
      });

      res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (error) {
      console.error("List NFT error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Create buy NFT transaction
   */
  async buyNFT(req, res) {
    try {
      const { buyer, seller, price } = req.body;

      if (!buyer || !seller || !price) {
        return res.status(400).json({
          success: false,
          error: "Buyer, seller, and price are required",
        });
      }

      const platformFee = parseInt(process.env.PLATFORM_FEE) || 250; // 2.5%

      const transactions = await algorandService.createBuyTransaction({
        buyer,
        seller,
        price,
        platformFee,
      });

      res.status(200).json({
        success: true,
        data: {
          ...transactions,
          platformFee,
          message: "Sign all grouped transactions in your wallet",
        },
      });
    } catch (error) {
      console.error("Buy NFT error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Submit signed transaction
   */
  async submitTransaction(req, res) {
    try {
      const { signedTxn } = req.body;

      if (!signedTxn) {
        return res.status(400).json({
          success: false,
          error: "Signed transaction is required",
        });
      }

      const result = await algorandService.submitTransaction(signedTxn);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Submit transaction error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get NFT details by asset ID
   */
  async getNFTDetails(req, res) {
    try {
      const { assetId } = req.params;

      if (!assetId) {
        return res.status(400).json({
          success: false,
          error: "Asset ID is required",
        });
      }

      const assetInfo = await algorandService.getAssetInfo(parseInt(assetId));

      res.status(200).json({
        success: true,
        data: assetInfo,
      });
    } catch (error) {
      console.error("Get NFT details error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Create opt-in transaction
   */
  async optIn(req, res) {
    try {
      const { address } = req.body;

      if (!address) {
        return res.status(400).json({
          success: false,
          error: "Address is required",
        });
      }

      const transaction = await algorandService.createOptInTransaction(address);

      res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (error) {
      console.error("Opt-in error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get marketplace listings
   */
  async getMarketplace(req, res) {
    try {
      // In a production app, you would query an indexer or database
      // For this example, we'll return a placeholder response
      res.status(200).json({
        success: true,
        data: {
          message: "Use Algorand Indexer to query marketplace listings",
          tip: "Filter by app_id and look for local state with price > 0",
        },
      });
    } catch (error) {
      console.error("Get marketplace error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new NFTController();
