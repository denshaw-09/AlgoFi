import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NFTCard from '../components/NFTCard';
import { NFTGridSkeleton } from '../components/SkeletonLoader';
import { EmptyPortfolio, EmptyCreatedNFTs } from '../components/EmptyState';

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

      // Mock data - demo
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
        <div className="card-sketch-dark p-12">
          <div className="text-6xl mb-6">👛</div>
          <h2 className="text-3xl font-bold text-[#f3e9d2] mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Connect your wallet to view your NFT portfolio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#f3e9d2] mb-4">
          My Portfolio
        </h1>
        <p className="text-xl text-gray-400">
          Manage your NFT collection
        </p>
      </div>

      {/* stats card */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-[#292524] rounded-xl p-6 border-2 border-[#3e3834] shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
            <p className="text-gray-400 text-sm mb-1">Total NFTs</p>
            <p className="text-3xl font-bold text-white">{stats.totalNfts}</p>
          </div>
          <div className="bg-[#292524] rounded-xl p-6 border-2 border-[#3e3834] shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
            <p className="text-gray-400 text-sm mb-1">🎨 Art</p>
            <p className="text-3xl font-bold text-[#fca311]">{stats.artNfts}</p>
          </div>
          <div className="bg-[#292524] rounded-xl p-6 border-2 border-[#3e3834] shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
            <p className="text-gray-400 text-sm mb-1">🎵 Music</p>
            <p className="text-3xl font-bold text-pink-400">{stats.musicNfts}</p>
          </div>
          <div className="bg-[#292524] rounded-xl p-6 border-2 border-[#3e3834] shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
            <p className="text-gray-400 text-sm mb-1">💎 Standard</p>
            <p className="text-3xl font-bold text-blue-400">{stats.standardNfts}</p>
          </div>
          <div className="bg-[#292524] rounded-xl p-6 border-2 border-[#3e3834] shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
            <p className="text-gray-400 text-sm mb-1">Total Value</p>
            <p className="text-2xl font-bold text-green-400">{formatPrice(stats.totalValue)} ALGO</p>
          </div>
        </div>
      )}

      {/* a/c info */}
      <div className="card-sketch-dark p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#fca311] rounded-full flex items-center justify-center text-3xl border-2 border-[#f3e9d2]">
              👤
            </div>
            <div>
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="text-lg font-mono text-[#f3e9d2]">{account}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <a
              href={`https://testnet.algoexplorer.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#1c1917] hover:bg-[#3e3834] text-[#fca311] rounded-lg font-medium transition border-2 border-[#3e3834]"
            >
              View on Explorer
            </a>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="flex space-x-4 border-b-2 border-[#3e3834]">
        <button
          onClick={() => setActiveTab('owned')}
          className={`px-6 py-3 font-bold text-lg transition border-t-2 border-x-2 rounded-t-lg ${activeTab === 'owned'
            ? 'bg-[#fca311] text-black border-[#fca311] translate-y-[2px]'
            : 'bg-transparent text-gray-400 border-transparent hover:text-[#f3e9d2]'
            }`}
        >
          Owned NFTs ({myNfts.length})
        </button>
        <button
          onClick={() => setActiveTab('created')}
          className={`px-6 py-3 font-bold text-lg transition border-t-2 border-x-2 rounded-t-lg ${activeTab === 'created'
            ? 'bg-[#fca311] text-black border-[#fca311] translate-y-[2px]'
            : 'bg-transparent text-gray-400 border-transparent hover:text-[#f3e9d2]'
            }`}
        >
          Created NFTs ({createdNfts.length})
        </button>
      </div>

      {/* NFT Grid */}
      {loading ? (
        <NFTGridSkeleton count={3} />
      ) : (
        <>
          {activeTab === 'owned' && (
            <div>
              {ownedNfts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <EmptyPortfolio connected={connected} />
              )}
            </div>
          )}

          {activeTab === 'created' && (
            <div>
              {createdNfts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {createdNfts.map(nft => (
                    <div key={nft.id} className="relative">
                      <NFTCard
                        nft={nft}
                        account={account}
                        showActions={false}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-[#fca311] border-2 border-black rounded-full text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000]">
                          CREATOR
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyCreatedNFTs />
              )}
            </div>
          )}
        </>
      )}

      {/* Quick Actions */}
      <div className="bg-[#292524] rounded-2xl p-8 border-2 border-[#fca311] shadow-[6px_6px_0px_0px_#000]">
        <h3 className="text-2xl font-bold text-[#f3e9d2] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/"
            className="p-6 bg-[#1c1917] hover:bg-[#3e3834] rounded-xl border-2 border-[#3e3834] transition text-center hover:-translate-y-1"
          >
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-[#f3e9d2] font-medium">Mint New NFT</p>
          </a>
          <a
            href="/marketplace"
            className="p-6 bg-[#1c1917] hover:bg-[#3e3834] rounded-xl border-2 border-[#3e3834] transition text-center hover:-translate-y-1"
          >
            <div className="text-4xl mb-2">🛒</div>
            <p className="text-[#f3e9d2] font-medium">Browse Marketplace</p>
          </a>
          <a
            href={`https://testnet.algoexplorer.io/address/${account}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[#1c1917] hover:bg-[#3e3834] rounded-xl border-2 border-[#3e3834] transition text-center hover:-translate-y-1"
          >
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-[#f3e9d2] font-medium">View on Explorer</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;