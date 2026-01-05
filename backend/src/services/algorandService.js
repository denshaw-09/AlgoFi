import algosdk from "algosdk";

class AlgorandService {
  constructor() {
    // Algorand TestNet configuration
    this.algodToken = process.env.ALGOD_TOKEN || "";
    this.algodServer =
      process.env.ALGOD_SERVER || "https://testnet-api.algonode.cloud";
    this.algodPort = process.env.ALGOD_PORT || "";

    // Initialize Algod client
    this.algodClient = new algosdk.Algodv2(
      this.algodToken,
      this.algodServer,
      this.algodPort
    );

    // Application ID (set after deployment)
    this.appId = parseInt(process.env.APP_ID) || 0;
  }

  /**
   * Get account information
   */
  async getAccountInfo(address) {
    try {
      const accountInfo = await this.algodClient
        .accountInformation(address)
        .do();
      return {
        address: accountInfo.address,
        amount: accountInfo.amount,
        assets: accountInfo.assets || [],
        appsLocalState: accountInfo["apps-local-state"] || [],
      };
    } catch (error) {
      throw new Error(`Failed to get account info: ${error.message}`);
    }
  }

  /**
   * Create and sign NFT minting transaction
   */
  async createMintTransaction(params) {
    try {
      const { creator, name, type, purchasable, price, metadata } = params;

      // Get suggested params
      const suggestedParams = await this.algodClient
        .getTransactionParams()
        .do();

      // Prepare application arguments
      const appArgs = [
        new Uint8Array(Buffer.from("mint_nft")),
        new Uint8Array(Buffer.from(name)),
        new Uint8Array(Buffer.from(type)),
        algosdk.encodeUint64(purchasable ? 1 : 0),
        algosdk.encodeUint64(price || 0),
      ];

      // Create application call transaction
      const txn = algosdk.makeApplicationNoOpTxn(
        creator,
        suggestedParams,
        this.appId,
        appArgs
      );

      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
          "base64"
        ),
        txnId: txn.txID(),
      };
    } catch (error) {
      throw new Error(`Failed to create mint transaction: ${error.message}`);
    }
  }

  /**
   * Create NFT asset on Algorand
   */
  async createNFTAsset(params) {
    try {
      const { creator, assetName, unitName, total, decimals, url, metadata } =
        params;
      if (!creator) {
        throw new Error(
          "Creator address must be provided to create an NFT asset."
        );
      }
      const suggestedParams = await this.algodClient
        .getTransactionParams()
        .do();

      // Create asset configuration transaction
      const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: creator,
        total: total || 1,
        decimals: decimals || 0,
        assetName: assetName,
        unitName: unitName || "NFT",
        assetURL: url || "",
        assetMetadataHash: metadata
          ? new Uint8Array(Buffer.from(metadata))
          : undefined,
        defaultFrozen: false,
        freeze: undefined,
        manager: creator,
        clawback: undefined,
        reserve: undefined,
        suggestedParams,
      });
      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
          "base64"
        ),
        txnId: txn.txID(),
      };
    } catch (error) {
      throw new Error(`Failed to create NFT asset: ${error.message}`);
    }
  }

  /**
   * Create list NFT transaction
   */
  async createListTransaction(params) {
    try {
      const { seller, price } = params;

      const suggestedParams = await this.algodClient
        .getTransactionParams()
        .do();

      const appArgs = [
        new Uint8Array(Buffer.from("list_nft")),
        algosdk.encodeUint64(price),
      ];

      const txn = algosdk.makeApplicationNoOpTxn(
        seller,
        suggestedParams,
        this.appId,
        appArgs
      );

      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
          "base64"
        ),
        txnId: txn.txID(),
      };
    } catch (error) {
      throw new Error(`Failed to create list transaction: ${error.message}`);
    }
  }

  /**
   * Create buy NFT transaction group
   */
  async createBuyTransaction(params) {
    try {
      const { buyer, seller, price, platformFee } = params;

      const suggestedParams = await this.algodClient
        .getTransactionParams()
        .do();

      // Calculate amounts
      const feeAmount = Math.floor((price * platformFee) / 10000);
      const sellerAmount = price - feeAmount;

      // Create payment transactions
      const feeTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: buyer,
        to: process.env.PLATFORM_WALLET,
        amount: feeAmount,
        suggestedParams,
      });

      const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: buyer,
        to: seller,
        amount: sellerAmount,
        suggestedParams,
      });

      // Create application call transaction
      const appArgs = [new Uint8Array(Buffer.from("buy_nft"))];
      const accounts = [seller];

      const appCallTxn = algosdk.makeApplicationNoOpTxn(
        buyer,
        suggestedParams,
        this.appId,
        appArgs,
        accounts
      );

      // Group transactions
      const txnGroup = [feeTxn, paymentTxn, appCallTxn];
      algosdk.assignGroupID(txnGroup);

      return {
        txns: txnGroup.map((txn) =>
          Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64")
        ),
        groupId: Buffer.from(txnGroup[0].group).toString("base64"),
      };
    } catch (error) {
      throw new Error(`Failed to create buy transaction: ${error.message}`);
    }
  }

  /**
   * Submit signed transaction to network
   */
  async submitTransaction(signedTxn) {
    try {
      const txnBuffer = Buffer.from(signedTxn, "base64");
      const { txId } = await this.algodClient
        .sendRawTransaction(txnBuffer)
        .do();

      // Wait for confirmation
      const confirmedTxn = await this.waitForConfirmation(txId);

      return {
        txId,
        confirmedRound: confirmedTxn["confirmed-round"],
      };
    } catch (error) {
      throw new Error(`Failed to submit transaction: ${error.message}`);
    }
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForConfirmation(txId, timeout = 10) {
    try {
      const status = await algosdk.waitForConfirmation(
        this.algodClient,
        txId,
        timeout
      );
      return status;
    } catch (error) {
      throw new Error(`Transaction not confirmed: ${error.message}`);
    }
  }

  /**
   * Get application state
   */
  async getApplicationState(address) {
    try {
      const accountInfo = await this.algodClient
        .accountInformation(address)
        .do();
      const localState = accountInfo["apps-local-state"]?.find(
        (app) => app.id === this.appId
      );

      if (!localState) {
        return null;
      }

      const state = {};
      localState["key-value"]?.forEach((kv) => {
        const key = Buffer.from(kv.key, "base64").toString();
        let value;

        if (kv.value.type === 1) {
          value = Buffer.from(kv.value.bytes, "base64").toString();
        } else {
          value = kv.value.uint;
        }

        state[key] = value;
      });

      return state;
    } catch (error) {
      throw new Error(`Failed to get application state: ${error.message}`);
    }
  }

  /**
   * Get asset information
   */
  async getAssetInfo(assetId) {
    try {
      const assetInfo = await this.algodClient.getAssetByID(assetId).do();
      return {
        index: assetInfo.index,
        params: assetInfo.params,
        createdAtRound: assetInfo["created-at-round"],
      };
    } catch (error) {
      throw new Error(`Failed to get asset info: ${error.message}`);
    }
  }

  /**
   * Opt-in to application
   */
  async createOptInTransaction(address) {
    try {
      const suggestedParams = await this.algodClient
        .getTransactionParams()
        .do();

      const txn = algosdk.makeApplicationOptInTxn(
        address,
        suggestedParams,
        this.appId
      );

      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
          "base64"
        ),
        txnId: txn.txID(),
      };
    } catch (error) {
      throw new Error(`Failed to create opt-in transaction: ${error.message}`);
    }
  }
}

export default new AlgorandService();
