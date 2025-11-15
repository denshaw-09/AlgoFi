const algosdk = require('algosdk');

class AlgorandService {
  constructor() {
    // Algorand TestNet configuration
    this.algodToken = process.env.ALGOD_TOKEN || '';
    this.algodServer = process.env.ALGOD_SERVER || 'https://testnet-api.algonode.cloud';
    this.algodPort = process.env.ALGOD_PORT || '';
    
    // Initialize Algod client
    this.algodClient = new algosdk.Algodv2(this.algodToken, this.algodServer, this.algodPort);
    
    // Application ID (set after deployment)
    this.appId = parseInt(process.env.APP_ID) || 0;
  }

  /**
   * Validate Algorand address format
   */
  validateAddress(address) {
    if (!address) {
      throw new Error('Address is required');
    }
    
    // Trim whitespace
    const trimmedAddress = address.trim();
    
    if (!algosdk.isValidAddress(trimmedAddress)) {
      throw new Error(`Invalid Algorand address format: ${trimmedAddress}`);
    }
    
    return trimmedAddress;
  }

  /**
   * Get account information
   */
  async getAccountInfo(address) {
    try {
      const validAddress = this.validateAddress(address);
      const accountInfo = await this.algodClient.accountInformation(validAddress).do();
      return {
        address: accountInfo.address,
        amount: accountInfo.amount,
        assets: accountInfo.assets || [],
        appsLocalState: accountInfo['apps-local-state'] || []
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

      // Validate creator address
      const validCreator = this.validateAddress(creator);

      // Validate required fields
      if (!name || !type) {
        throw new Error('NFT name and type are required');
      }

      // Get suggested params
      const suggestedParams = await this.algodClient.getTransactionParams().do();

      // Prepare application arguments
      const appArgs = [
        new Uint8Array(Buffer.from('mint_nft')),
        new Uint8Array(Buffer.from(name)),
        new Uint8Array(Buffer.from(type)),
        algosdk.encodeUint64(purchasable ? 1 : 0),
        algosdk.encodeUint64(price || 0)
      ];

      // Create application call transaction
      const txn = algosdk.makeApplicationNoOpTxn(
        validCreator,
        suggestedParams,
        this.appId,
        appArgs
      );

      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
        txnId: txn.txID()
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
      const { creator, assetName, unitName, total, decimals, url, metadata } = params;
      
      // Validate creator address with detailed error
      if (!creator) {
        throw new Error('Creator address is required. Please ensure wallet is connected.');
      }

      const validCreator = this.validateAddress(creator);

      // Validate asset parameters
      if (!assetName) {
        throw new Error('Asset name is required');
      }

      const suggestedParams = await this.algodClient.getTransactionParams().do();

      // Create asset configuration transaction
      const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: validCreator,
        total: total || 1,
        decimals: decimals || 0,
        assetName: assetName,
        unitName: unitName || 'NFT',
        assetURL: url || '',
        assetMetadataHash: metadata ? new Uint8Array(Buffer.from(metadata)) : undefined,
        defaultFrozen: false,
        freeze: undefined,
        manager: validCreator,
        clawback: undefined,
        reserve: undefined,
        suggestedParams
      });
      
      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
        txnId: txn.txID()
      };
    } catch (error) {
      // Provide more context in error message
      if (error.message.includes('Invalid Algorand address')) {
        throw new Error(`Invalid creator address format. Please reconnect your wallet. Details: ${error.message}`);
      }
      throw new Error(`Failed to create NFT asset: ${error.message}`);
    }
  }

  /**
   * Create list NFT transaction
   */
  async createListTransaction(params) {
    try {
      const { seller, price } = params;

      const validSeller = this.validateAddress(seller);

      if (!price || price <= 0) {
        throw new Error('Valid price is required');
      }

      const suggestedParams = await this.algodClient.getTransactionParams().do();

      const appArgs = [
        new Uint8Array(Buffer.from('list_nft')),
        algosdk.encodeUint64(price)
      ];

      const txn = algosdk.makeApplicationNoOpTxn(
        validSeller,
        suggestedParams,
        this.appId,
        appArgs
      );

      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
        txnId: txn.txID()
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

      const validBuyer = this.validateAddress(buyer);
      const validSeller = this.validateAddress(seller);

      if (!price || price <= 0) {
        throw new Error('Valid price is required');
      }

      const suggestedParams = await this.algodClient.getTransactionParams().do();

      // Calculate amounts
      const feeAmount = Math.floor((price * platformFee) / 10000);
      const sellerAmount = price - feeAmount;

      // Create payment transactions
      const feeTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: validBuyer,
        to: process.env.PLATFORM_WALLET,
        amount: feeAmount,
        suggestedParams
      });

      const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: validBuyer,
        to: validSeller,
        amount: sellerAmount,
        suggestedParams
      });

      // Create application call transaction
      const appArgs = [new Uint8Array(Buffer.from('buy_nft'))];
      const accounts = [validSeller];

      const appCallTxn = algosdk.makeApplicationNoOpTxn(
        validBuyer,
        suggestedParams,
        this.appId,
        appArgs,
        accounts
      );

      // Group transactions
      const txnGroup = [feeTxn, paymentTxn, appCallTxn];
      algosdk.assignGroupID(txnGroup);

      return {
        txns: txnGroup.map(txn => 
          Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
        ),
        groupId: Buffer.from(txnGroup[0].group).toString('base64')
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
      const txnBuffer = Buffer.from(signedTxn, 'base64');
      const { txId } = await this.algodClient.sendRawTransaction(txnBuffer).do();
      
      // Wait for confirmation
      const confirmedTxn = await this.waitForConfirmation(txId);
      
      return {
        txId,
        confirmedRound: confirmedTxn['confirmed-round']
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
      const status = await algosdk.waitForConfirmation(this.algodClient, txId, timeout);
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
      const validAddress = this.validateAddress(address);
      const accountInfo = await this.algodClient.accountInformation(validAddress).do();
      const localState = accountInfo['apps-local-state']?.find(
        app => app.id === this.appId
      );

      if (!localState) {
        return null;
      }

      const state = {};
      localState['key-value']?.forEach(kv => {
        const key = Buffer.from(kv.key, 'base64').toString();
        let value;
        
        if (kv.value.type === 1) {
          value = Buffer.from(kv.value.bytes, 'base64').toString();
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
      if (!assetId || assetId <= 0) {
        throw new Error('Valid asset ID is required');
      }

      const assetInfo = await this.algodClient.getAssetByID(assetId).do();
      return {
        index: assetInfo.index,
        params: assetInfo.params,
        createdAtRound: assetInfo['created-at-round']
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
      const validAddress = this.validateAddress(address);
      const suggestedParams = await this.algodClient.getTransactionParams().do();

      const txn = algosdk.makeApplicationOptInTxn(
        validAddress,
        suggestedParams,
        this.appId
      );

      return {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
        txnId: txn.txID()
      };
    } catch (error) {
      throw new Error(`Failed to create opt-in transaction: ${error.message}`);
    }
  }
}

module.exports = new AlgorandService();