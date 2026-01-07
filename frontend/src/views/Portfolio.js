import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NFTCard from '../components/NFTCard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Portfolio({ account, connected }) {
  const [myNfts, setMyNfts] = useState([]);
  const [stats, setStats] = useState({
    totalNfts: 0,
    artNfts: 0,
    musicNfts: 0,
    standardNfts: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('owned');

  const fetchPortfolio = useCallback(async () => {
    setLoading(true);
    try {
      // In production, fetch from backend/indexer
      await axios.get(`${API_URL}/nfts/account/${account}`);

      // Mock data for demonstration
      const mockNfts = [
        {
          id: 1,
          name: 'My First Art',
          type: 'art',
          creator: account,
          price: 5000000,
          purchasable: true,
          description: 'My debut digital artwork',
          imageUrl: 'https://via.placeholder.com/400/6B46C1/FFFFFF?text=My+Art'
        },
        {
          id: 2,
          name: 'Collected Beats',
          type: 'music',
          creator: 'ALGO456DEF...ABC123',
          price: 3000000,
          purchasable: false,
          description: 'Music NFT from my favorite artist',
          imageUrl: 'https://via.placeholder.com/400/EC4899/FFFFFF?text=Beats'
        }
      ];

      setMyNfts(mockNfts);

      // Calculate stats
      const stats = {
        totalNfts: mockNfts.length,
        artNfts: mockNfts.filter(n => n.type === 'art').length,
        musicNfts: mockNfts.filter(n => n.type === 'music').length,
        standardNfts: mockNfts.filter(n => n.type === 'standard').length,
        totalValue: mockNfts.reduce((sum, nft) => sum + nft.price, 0)
      };
      setStats(stats);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    if (account && connected) {
      fetchPortfolio();
    } else {
      setLoading(false);
    }
  }, [account, connected, fetchPortfolio]);

  const formatPrice = (microAlgos) => {
    return (microAlgos / 1000000).toFixed(2);
  };

  const ownedNfts = myNfts.filter(nft => nft.creator === account || activeTab === 'owned');
  const createdNfts = myNfts.filter(nft => nft.creator === account);

  if (!connected || !account) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-12 border border-purple-200 dark:border-purple-500/20 hover-glitter">
          <div className="text-6xl mb-6">👛</div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-slate-600 dark:text-gray-300 mb-8">
            Connect your wallet to view your NFT portfolio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
          My Portfolio
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-300">
          Manage your NFT collection
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-200 dark:border-purple-500/20 transition transform duration-300 hover:scale-105 hover-glitter cursor-default">
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">Total NFTs</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalNfts}</p>
        </div>
        <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-200 dark:border-purple-500/20 transition transform duration-300 hover:scale-105 hover-glitter cursor-default">
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">🎨 Art</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.artNfts}</p>
        </div>
        <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-200 dark:border-purple-500/20 transition transform duration-300 hover:scale-105 hover-glitter cursor-default">
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">🎵 Music</p>
          <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{stats.musicNfts}</p>
        </div>
        <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-200 dark:border-purple-500/20 transition transform duration-300 hover:scale-105 hover-glitter cursor-default">
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">💎 Standard</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.standardNfts}</p>
        </div>
        <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-200 dark:border-purple-500/20 transition transform duration-300 hover:scale-105 hover-glitter cursor-default">
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">Total Value</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatPrice(stats.totalValue)} ALGO</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-200 dark:border-purple-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-400">Wallet Address</p>
              <p className="text-lg font-mono text-slate-900 dark:text-white">{account}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <a
              href={`https://testnet.algoexplorer.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-500/10 dark:bg-purple-500/20 hover:bg-purple-500/20 dark:hover:bg-purple-500/30 text-purple-600 dark:text-purple-400 rounded-lg font-medium transition border border-purple-200 dark:border-purple-500/30"
            >
              View on Explorer
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-purple-200 dark:border-purple-500/20">
        <button
          onClick={() => setActiveTab('owned')}
          className={`px-6 py-3 font-medium transition border-b-2 ${activeTab === 'owned'
            ? 'border-purple-500 text-purple-600 dark:text-purple-400'
            : 'border-transparent text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300'
            }`}
        >
          Owned NFTs ({myNfts.length})
        </button>
        <button
          onClick={() => setActiveTab('created')}
          className={`px-6 py-3 font-medium transition border-b-2 ${activeTab === 'created'
            ? 'border-purple-500 text-purple-600 dark:text-purple-400'
            : 'border-transparent text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300'
            }`}
        >
          Created NFTs ({createdNfts.length})
        </button>
      </div>

      {/* NFT Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          <p className="text-gray-400 mt-4">Loading portfolio...</p>
        </div>
      ) : (
        <>
          {activeTab === 'owned' && (
            <div>
              {ownedNfts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ownedNfts.map(nft => (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      account={account}
                      showActions={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No NFTs Yet</h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-6">
                    Start your collection by minting or purchasing NFTs
                  </p>
                  <div className="flex justify-center gap-4">
                    <a
                      href="/"
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition"
                    >
                      Mint NFT
                    </a>
                    <a
                      href="/marketplace"
                      className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition"
                    >
                      Browse Marketplace
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'created' && (
            <div>
              {createdNfts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {createdNfts.map(nft => (
                    <div key={nft.id} className="relative">
                      <NFTCard
                        nft={nft}
                        account={account}
                        showActions={false}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                          CREATOR
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Created NFTs</h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-6">
                    Start creating by minting your first NFT
                  </p>
                  <a
                    href="/"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition"
                  >
                    Create Your First NFT
                  </a>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-200 dark:border-purple-500/30">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/"
            className="p-6 bg-white/60 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl border border-purple-200 dark:border-purple-500/20 transition text-center hover-glitter hover:scale-105 transform duration-300"
          >
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-slate-900 dark:text-white font-medium">Mint New NFT</p>
          </a>
          <a
            href="/marketplace"
            className="p-6 bg-white/60 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl border border-purple-200 dark:border-purple-500/20 transition text-center hover-glitter hover:scale-105 transform duration-300"
          >
            <div className="text-4xl mb-2">🛒</div>
            <p className="text-slate-900 dark:text-white font-medium">Browse Marketplace</p>
          </a>
          <a
            href={`https://testnet.algoexplorer.io/address/${account}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/60 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl border border-purple-200 dark:border-purple-500/20 transition text-center hover-glitter hover:scale-105 transform duration-300"
          >
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-slate-900 dark:text-white font-medium">View on Explorer</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;