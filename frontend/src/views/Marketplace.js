import React, { useState, useEffect } from 'react';
import NFTCard from '../components/NFTCard';
import { NFTGridSkeleton } from '../components/SkeletonLoader';
import { NoNFTsFound, EmptyMarketplace } from '../components/EmptyState';

function Marketplace({ account, connected }) {
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [hasFilters, setHasFilters] = useState(false);

  // Mock data - In production, fetch from indexer or backend
  useEffect(() => {
    const mockNfts = [
      {
        id: 1,
        name: 'Cosmic Dreams #1',
        type: 'art',
        creator: 'ALGO123ABC...XYZ789',
        price: 5000000,
        purchasable: true,
        description: 'A stunning digital artwork exploring the cosmos',
        imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=911'
      },
      {
        id: 2,
        name: 'Summer Vibes',
        type: 'music',
        creator: 'ALGO456DEF...ABC123',
        price: 3000000,
        purchasable: true,
        description: 'Chill beats for summer days',
        imageUrl: 'https://plus.unsplash.com/premium_vector-1758615402989-6e1576b07d99?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=805'
      },
      {
        id: 3,
        name: 'Genesis Collection',
        type: 'standard',
        creator: 'ALGO789GHI...DEF456',
        price: 0,
        purchasable: false,
        description: 'Limited edition genesis collectible',
        imageUrl: 'https://images.unsplash.com/photo-1572025132259-70ae786dbc3e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
      },
      {
        id: 4,
        name: 'Abstract Emotions',
        type: 'art',
        creator: 'ALGO234JKL...GHI789',
        price: 7500000,
        purchasable: true,
        description: 'Expressing feelings through abstract art',
        imageUrl: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074'
      },
      {
        id: 5,
        name: 'Epic Soundtrack',
        type: 'music',
        creator: 'ALGO567MNO...JKL012',
        price: 4000000,
        purchasable: true,
        description: 'Epic orchestral composition',
        imageUrl: 'https://images.unsplash.com/photo-1648461513577-8521ecdf50c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      },
      {
        id: 6,
        name: 'Community Badge',
        type: 'standard',
        creator: 'ALGO890PQR...MNO345',
        price: 0,
        purchasable: false,
        description: 'Free community supporter badge',
        imageUrl: 'https://images.unsplash.com/photo-1645604136298-0c5ab75630f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172'
      },
      {
        id: 7,
        name: 'Digital Landscape',
        type: 'art',
        creator: 'ALGO321STU...PQR678',
        price: 6200000,
        purchasable: true,
        description: 'Beautiful digital landscape artwork',
        imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032'
      },
      {
        id: 8,
        name: 'Night Rhythms',
        type: 'music',
        creator: 'ALGO654VWX...STU901',
        price: 3500000,
        purchasable: true,
        description: 'Ambient night music collection',
        imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      },
      {
        id: 9,
        name: 'Founder Token',
        type: 'standard',
        creator: 'ALGO987YZA...VWX234',
        price: 0,
        purchasable: false,
        description: 'Exclusive founder token for early supporters',
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332'
      },
      {
        id: 10,
        name: 'Ocean Depths',
        type: 'art',
        creator: 'ALGO135BCD...YZA567',
        price: 8900000,
        purchasable: true,
        description: 'Underwater exploration in digital art',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      },
      {
        id: 11,
        name: 'Jazz Fusion',
        type: 'music',
        creator: 'ALGO468EFG...BCD890',
        price: 4500000,
        purchasable: true,
        description: 'Modern jazz meets electronic fusion',
        imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      },
      {
        id: 12,
        name: 'Urban Dreams',
        type: 'art',
        creator: 'ALGO791HIJ...EFG123',
        price: 5500000,
        purchasable: true,
        description: 'Cityscape meets surrealism',
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      },
      {
        id: 13,
        name: 'Electronic Symphony',
        type: 'music',
        creator: 'ALGO024KLM...HIJ456',
        price: 2800000,
        purchasable: true,
        description: 'Experimental electronic soundscapes',
        imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      },
      {
        id: 14,
        name: 'Vintage Collection',
        type: 'standard',
        creator: 'ALGO357NOP...KLM789',
        price: 0,
        purchasable: false,
        description: 'Limited edition vintage collectible',
        imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      },
      {
        id: 15,
        name: 'Neon Nights',
        type: 'art',
        creator: 'ALGO680QRS...NOP012',
        price: 7200000,
        purchasable: true,
        description: 'Cyberpunk-inspired neon artwork',
        imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
      }
    ];

    setTimeout(() => {
      setNfts(mockNfts);
      setFilteredNfts(mockNfts);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...nfts];
    const filtersApplied = filter !== 'all' || searchQuery !== '';
    setHasFilters(filtersApplied);

    // Type filter
    if (filter !== 'all') {
      result = result.filter(nft => nft.type === filter);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(nft =>
        nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredNfts(result);
  }, [filter, searchQuery, sortBy, nfts]);

  // Clear all filters
  const handleClearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setSortBy('newest');
  };

  const filterOptions = [
    { value: 'all', label: 'All NFTs', icon: '🌟' },
    { value: 'art', label: 'Art', icon: '🎨' },
    { value: 'music', label: 'Music', icon: '🎵' },
    { value: 'standard', label: 'Standard', icon: '💎' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#f3e9d2] mb-4">
          Explore Marketplace
        </h1>
        <p className="text-xl text-gray-400">
          Discover unique NFTs from talented creators
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[#292524] rounded-2xl p-6 border-2 border-[#3e3834] shadow-[4px_4px_0px_0px_#000]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 input-sketch"
            />
          </div>

          {/* Type Filter */}
          <div className="md:col-span-1">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-3 input-sketch cursor-pointer"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="md:col-span-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 input-sketch cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3">
        {filterOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg font-bold transition border-2 ${
              filter === option.value
                ? 'bg-[#fca311] text-black border-[#f3e9d2] shadow-[2px_2px_0px_0px_#000]'
                : 'bg-[#292524] text-gray-400 border-[#3e3834] hover:border-[#fca311]'
            }`}
          >
            {option.icon} {option.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-gray-400 text-lg">
        Showing <span className="font-bold text-[#fca311]">{filteredNfts.length}</span> {filteredNfts.length === 1 ? 'NFT' : 'NFTs'}
      </div>

      {/* NFT Grid */}
      {loading ? (
        <NFTGridSkeleton count={6} />
      ) : filteredNfts.length === 0 ? (
        nfts.length === 0 ? (
          <EmptyMarketplace />
        ) : (
          <NoNFTsFound hasFilters={hasFilters} onClearFilters={handleClearFilters} />
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNfts.map(nft => (
            <NFTCard
              key={nft.id}
              nft={nft}
              account={account}
              showActions={connected}
            />
          ))}
        </div>
      )}

      {/* Info Banner */}
      {!connected && (
        <div className="bg-[#292524] rounded-2xl p-8 border-2 border-[#fca311] text-center shadow-[6px_6px_0px_0px_#000]">
          <h3 className="text-2xl font-bold text-[#f3e9d2] mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-gray-300">
            Connect your wallet to purchase NFTs and interact with the marketplace
          </p>
        </div>
      )}
    </div>
  );
}

export default Marketplace;