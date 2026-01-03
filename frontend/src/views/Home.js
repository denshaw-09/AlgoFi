import React from 'react';
import { Link } from 'react-router-dom';
import MintForm from '../components/MintForm';

function Home({ account, connected }) {
  const features = [
    {
      icon: '🎨',
      title: 'Art NFTs',
      description: 'Create and trade unique digital artwork on the Algorand blockchain'
    },
    {
      icon: '🎵',
      title: 'Music NFTs',
      description: 'Mint your music as NFTs and connect directly with your fans'
    },
    {
      icon: '💎',
      title: 'Standard NFTs',
      description: 'Create any type of digital collectible with ease'
    },
    {
      icon: '🔒',
      title: 'Secure Trading',
      description: 'Built on Algorand for fast, secure, and low-cost transactions'
    },
    {
      icon: '🎁',
      title: 'Free Collectibles',
      description: 'Mint non-purchasable NFTs for community engagement'
    },
    {
      icon: '⚡',
      title: 'Instant Minting',
      description: 'Quick and easy NFT creation process with no technical knowledge needed'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Create, Trade & Collect
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight pb-2">
              NFTs on Algorand Testnet
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            AlgoFi is the decentralized NFT marketplace where artists, musicians, and creators
            can mint, showcase, and trade their digital assets with zero hassle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/marketplace"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold text-lg transition transform hover:scale-105 hover-glitter"
            >
              Explore Marketplace
            </Link>
            {connected ? (
              <a
                href="#mint"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-lg transition border border-purple-500/30 hover-glitter"
              >
                Start Minting
              </a>
            ) : (
              <button className="px-8 py-4 bg-slate-800/50 text-gray-400 rounded-lg font-bold text-lg cursor-not-allowed border border-purple-500/30">
                Connect Wallet to Mint
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 text-center hover-glitter hover:scale-105 transition transform duration-300">
          <div className="text-4xl font-bold text-purple-400 mb-2">Fast</div>
          <p className="text-gray-300">4.5 Second Finality</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 text-center hover-glitter hover:scale-105 transition transform duration-300">
          <div className="text-4xl font-bold text-pink-400 mb-2">Low Cost</div>
          <p className="text-gray-300">~0.001 ALGO Fees</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 text-center hover-glitter hover:scale-105 transition transform duration-300">
          <div className="text-4xl font-bold text-purple-400 mb-2">Eco-Friendly</div>
          <p className="text-gray-300">Carbon Negative</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Why Choose AlgoFi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition transform hover:scale-105 duration-300 hover-glitter group"
            >
              <div className="text-5xl mb-4 transition transform group-hover:scale-110 group-hover:rotate-6 duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
              <p className="text-gray-400">
                Connect your Pera Wallet or any Algorand-compatible wallet to get started
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Create Your NFT</h3>
              <p className="text-gray-400">
                Upload your artwork, music, or any digital asset and set your preferences
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">List or Share</h3>
              <p className="text-gray-400">
                List your NFT for sale on the marketplace or share it as a free collectible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mint Section */}
      {connected ? (
        <section id="mint" className="max-w-2xl mx-auto">
          <MintForm account={account} />
        </section>
      ) : (
        <section className="max-w-2xl mx-auto text-center py-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/20">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8">
              Connect your wallet to start minting and trading NFTs on AlgoFi
            </p>
            <button className="px-8 py-4 bg-slate-700/50 text-gray-400 rounded-lg font-bold text-lg cursor-not-allowed border border-purple-500/30">
              Connect Wallet First
            </button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the AlgoRand Community
          </h2>
          <p className="text-gray-300 mb-8">
            Be part of the next generation of digital creators and collectors
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/algorand"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition"
            >
              Join Discord
            </a>
            <a
              href="https://twitter.com/algorand"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition"
            >
              Follow on Twitter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;