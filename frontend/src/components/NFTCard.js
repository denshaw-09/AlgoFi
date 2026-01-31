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
      <div className="card-sketch overflow-hidden group relative flex flex-col h-full">
        {/* img container */}
        <div className="relative aspect-square overflow-hidden bg-sketch-bg-secondary border-b-4 border-sketch-border">
          {nft.imageUrl ? (
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl">{typeEmojis[nft.type] || '💎'}</span>
            </div>
          )}

          {/* type tag */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-sketch-bg-secondary rounded-lg text-xs font-bold text-sketch-mustard border-2 border-sketch-border shadow-[2px_2px_0px_0px_var(--color-shadow)]">
              {typeEmojis[nft.type]} {nft.type.toUpperCase()}
            </span>
          </div>

          {/* purchasable tag */}
          {!nft.purchasable && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-sketch-card-bg rounded-lg text-xs font-bold text-sketch-dark-text border-2 border-sketch-dark-text shadow-[2px_2px_0px_0px_var(--color-shadow)]">
                FREE
              </span>
            </div>
          )}
        </div>

        {/* details */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-sketch-dark-text mb-2 truncate font-['Fredoka_One']">
            {nft.name}
          </h3>

          {nft.description && (
            <p className="text-sketch-text-muted text-sm mb-4 line-clamp-2 font-bold">
              {nft.description}
            </p>
          )}

          <div className="mt-auto">
            {/* creator */}
            <div className="flex items-center space-x-2 mb-4 bg-sketch-creator-bg p-2 rounded-lg border border-sketch-border">
              <div className="w-8 h-8 bg-sketch-mustard rounded-full flex items-center justify-center border border-sketch-dark-text">
                <span className="text-xs">👤</span>
              </div>
              <div>
                <p className="text-xs text-sketch-text-muted font-bold">Creator</p>
                <p className="text-sm text-sketch-dark-text font-mono font-bold">
                  {nft.creator?.slice(0, 6)}...{nft.creator?.slice(-4)}
                </p>
              </div>
            </div>

            {/* Price or Free */}
            <div className="border-t-2 border-sketch-border pt-4">
              {nft.purchasable && nft.price > 0 ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-sketch-text-muted font-bold">Price</p>
                    <p className="text-2xl font-bold text-sketch-dark-text">
                      {formatPrice(nft.price)} <span className="text-lg text-sketch-mustard">ALGO</span>
                    </p>
                  </div>

                  {showActions && account && account !== nft.creator && (
                    <button
                      onClick={() => setShowBuyModal(true)}
                      disabled={loading}
                      className="btn-sketch-primary text-sm px-4 py-2"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sketch-text-muted text-sm font-bold italic">
                    {nft.purchasable ? 'Not listed for sale' : 'Non-purchasable collectible'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buy Confirmation Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card-sketch-dark p-8 max-w-md w-full">
            <h3 className="text-3xl font-bold text-sketch-mustard mb-6 text-center">Confirm Purchase</h3>

            <div className="space-y-4 mb-8 bg-sketch-bg p-6 rounded-xl border-2 border-sketch-border">
              <div className="flex justify-between items-center">
                <span className="text-sketch-text-secondary text-lg">NFT:</span>
                <span className="text-sketch-text font-bold text-xl">{nft.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sketch-text-secondary text-lg">Price:</span>
                <span className="text-sketch-mustard font-bold text-xl">
                  {formatPrice(nft.price)} ALGO
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sketch-text-secondary text-lg">Fee (2.5%):</span>
                <span className="text-sketch-text-muted font-bold">
                  {formatPrice(nft.price * 0.025)} ALGO
                </span>
              </div>
              <div className="border-t-2 border-sketch-border pt-4 flex justify-between items-center mt-4">
                <span className="text-sketch-text font-bold text-xl">Total:</span>
                <span className="text-sketch-text font-bold text-2xl">
                  {formatPrice(nft.price)} ALGO
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBuyModal(false)}
                disabled={loading}
                className="flex-1 btn-sketch-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                disabled={loading}
                className="flex-1 btn-sketch-primary"
              >
                {loading ? '...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NFTCard;