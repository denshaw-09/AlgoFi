import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function NFTCard({ nft, account, onBuySuccess, showActions = true }) {
  const [loading, setLoading] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const typeEmojis = {
    art: '🎨',
    music: '🎵',
    standard: '💎'
  };

  const formatPrice = (microAlgos) => {
    return (microAlgos / 1000000).toFixed(6);
  };

  const handleBuy = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/nfts/buy`, {
        buyer: account,
        seller: nft.creator,
        price: nft.price
      });

      if (response.data.success) {
        alert('Buy transaction created! Please sign in your wallet.');
        setShowBuyModal(false);
        if (onBuySuccess) {
          onBuySuccess(nft);
        }
      }
    } catch (error) {
      console.error('Buy error:', error);
      alert(error.response?.data?.error || 'Failed to create buy transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-200 dark:border-purple-500/20 hover:border-purple-500/50 transition group hover-glitter hover:shadow-2xl hover:shadow-purple-500/20 relative">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700/50">
          {nft.imageUrl ? (
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">{typeEmojis[nft.type] || '💎'}</span>
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
              {typeEmojis[nft.type]} {nft.type.toUpperCase()}
            </span>
          </div>

          {/* Purchasable Badge */}
          {!nft.purchasable && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                FREE
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 truncate">
            {nft.name}
          </h3>

          {nft.description && (
            <p className="text-slate-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {nft.description}
            </p>
          )}

          {/* Creator */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-gray-500">Creator</p>
              <p className="text-sm text-slate-700 dark:text-gray-300 font-medium">
                {nft.creator?.slice(0, 6)}...{nft.creator?.slice(-4)}
              </p>
            </div>
          </div>

          {/* Price or Free */}
          <div className="border-t border-purple-200 dark:border-purple-500/20 pt-4">
            {nft.purchasable && nft.price > 0 ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-gray-500">Price</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatPrice(nft.price)} <span className="text-lg">ALGO</span>
                  </p>
                </div>

                {showActions && account && account !== nft.creator && (
                  <button
                    onClick={() => setShowBuyModal(true)}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold transition disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-slate-500 dark:text-gray-400 text-sm">
                  {nft.purchasable ? 'Not listed for sale' : 'Non-purchasable collectible'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buy Confirmation Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-purple-200 dark:border-purple-500/30">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Confirm Purchase</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-gray-400">NFT:</span>
                <span className="text-slate-900 dark:text-white font-medium">{nft.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-gray-400">Price:</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  {formatPrice(nft.price)} ALGO
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-gray-400">Platform Fee (2.5%):</span>
                <span className="text-slate-500 dark:text-gray-300">
                  {formatPrice(nft.price * 0.025)} ALGO
                </span>
              </div>
              <div className="border-t border-purple-200 dark:border-purple-500/20 pt-4 flex justify-between">
                <span className="text-slate-900 dark:text-white font-bold">Total:</span>
                <span className="text-slate-900 dark:text-white font-bold">
                  {formatPrice(nft.price)} ALGO
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowBuyModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NFTCard;