import React from 'react';
import { Link } from 'react-router-dom';
import MintForm from '../components/MintForm';

const IconFast = () => (
  <svg className="w-16 h-16 text-[#292524]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="55" r="35" />
    <circle cx="50" cy="55" r="30" strokeWidth="1" />
    <path d="M45,15 L55,15 L55,20 L45,20 Z" fill="currentColor" />
    <path d="M50,20 L50,10" />
    <path d="M50,30 L50,35" />
    <path d="M50,75 L50,80" />
    <path d="M75,55 L70,55" />
    <path d="M25,55 L30,55" />
    <path d="M50,55 L65,40" strokeWidth="3" />
    <circle cx="50" cy="55" r="3" fill="currentColor" />
    <path d="M10,45 L20,45" />
    <path d="M5,55 L15,55" />
    <path d="M10,65 L20,65" />
  </svg>
);

const IconCost = () => (
  <svg className="w-16 h-16 text-[#292524]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="30" cy="40" rx="15" ry="6" />
    <path d="M15,40 L15,50 C15,55 45,55 45,50 L45,40" />
    <path d="M15,50 L15,60 C15,65 45,65 45,60 L45,50" />
    <ellipse cx="30" cy="70" rx="15" ry="6" />
    <path d="M15,70 L15,80 C15,85 45,85 45,80 L45,70" />
    <ellipse cx="70" cy="80" rx="12" ry="5" />
    <path d="M58,80 L58,88 C58,92 82,92 82,88 L82,80" />
    <path d="M65,30 L65,60" strokeWidth="4" />
    <path d="M55,50 L65,60 L75,50" strokeWidth="4" />
  </svg>
);

const IconEco = () => (
  <svg className="w-16 h-16 text-[#292524]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50,15 L55,15 L58,25 L68,28 L75,20 L82,25 L78,35 L85,42 L95,40 L98,50 L88,55 L85,65 L95,70 L90,80 L78,75 L68,82 L65,92 L55,90 L50,80 L40,80 L35,90 L25,92 L22,82 L12,75 L0,80 L-5,70 L5,65 L2,55 L-8,50 L-5,40 L5,42 L12,35 L8,25 L15,20 L22,28 L32,25 L35,15 Z" transform="translate(5,5) scale(0.9)" />
    <circle cx="50" cy="50" r="25" />
    <path d="M50,65 Q35,65 35,50 Q35,35 50,25 Q65,35 65,50 Q65,65 50,65 Z" />
    <path d="M50,65 L50,35" />
    <path d="M50,50 L60,45" />
    <path d="M50,55 L40,50" />
  </svg>
);

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
    <div className="space-y-20 pt-8">
      {/* hero section */}
      <section className="text-center py-10">
        <div className="max-w-5xl mx-auto">
          <h1 data-aos="zoom-in" className="text-6xl md:text-7xl font-bold text-[#f3e9d2] mb-8 leading-none drop-shadow-lg">
            Create, Trade & Collect<br />
            <span className="text-[#fca311] py-2">NFTs on Algorand</span>
          </h1>
          <p data-aos="fade-up" className="text-2xl text-gray-400 mb-10 leading-relaxed max-w-4xl mx-auto font-['Patrick_Hand']">
            AlgoFi is the decentralized NFT marketplace where artists, musicians, and creators
            can mint, showcase, and trade their digital assets with zero hassle.
          </p>
          <div data-aos="fade-up" className="flex flex-wrap justify-center gap-6">
            <Link data-aos="zoom-in" to="/marketplace">
              <button className="btn-sketch-primary text-xl px-10 py-4">
                Explore Marketplace
              </button>
            </Link>

            {connected ? (
              <a data-aos="zoom-in" href="#mint">
                <button className="btn-sketch-secondary text-xl px-10 py-4">
                  Start Minting
                </button>
              </a>
            ) : (
              <button data-aos="zoom-in" className="btn-sketch-secondary text-xl px-10 py-4">
                Connect Wallet to Mint
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats*/}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* fast */}
          <div data-aos="fade-up" className="card-sketch p-6 flex items-center gap-6">
            <div className="flex-shrink-0">
              <IconFast />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-[#292524] mb-1">Fast</h3>
              <p className="text-[#292524] font-bold text-lg font-['Patrick_Hand']">4.5 Second Finality</p>
            </div>
          </div>

          {/* low cost */}
          <div data-aos="fade-down" className="card-sketch p-6 flex items-center gap-6">
            <div className="flex-shrink-0">
              <IconCost />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-[#292524] mb-1">Low Cost</h3>
              <p className="text-[#292524] font-bold text-lg font-['Patrick_Hand']">~0.001 ALGO Fees</p>
            </div>
          </div>

          {/* eco-friendly */}
          <div data-aos="fade-up" className="card-sketch p-6 flex items-center gap-6">
            <div className="flex-shrink-0">
              <IconEco />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-[#292524] mb-1">Eco-Friendly</h3>
              <p className="text-[#292524] font-bold text-lg font-['Patrick_Hand']">Carbon Negative</p>
            </div>
          </div>

        </div>
      </section>

      {/* features */}
      <section className="max-w-6xl mx-auto">
        <h2 data-aos="fade-in" className="text-5xl font-bold text-[#f3e9d2] text-center mb-12">
          Why Choose AlgoFi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} data-aos="fade-up">
              <div className="card-sketch-dark p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-[#fca311] mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* how it work section */}
      <section className="max-w-4xl mx-auto">
        <h2 data-aos="fade-in" className="text-5xl font-bold text-[#f3e9d2] text-center mb-12">
          How It Works
        </h2>
        <div className="space-y-8">
          <div data-aos="fade-up" className="flex items-center space-x-6 bg-[#292524] p-6 rounded-xl border-2 border-[#3e3834]">
            <div className="flex-shrink-0 w-16 h-16 bg-[#fca311] rounded-full flex items-center justify-center text-[#292524] font-bold text-3xl border-2 border-[#f3e9d2] shadow-[4px_4px_0px_0px_#000]">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#f3e9d2] mb-2">Connect Your Wallet</h3>
              <p className="text-gray-400 text-lg">
                Connect your Pera Wallet or any Algorand-compatible wallet to get started
              </p>
            </div>
          </div>

          <div data-aos="fade-up" className="flex items-center space-x-6 bg-[#292524] p-6 rounded-xl border-2 border-[#3e3834]">
            <div className="flex-shrink-0 w-16 h-16 bg-[#fca311] rounded-full flex items-center justify-center text-[#292524] font-bold text-3xl border-2 border-[#f3e9d2] shadow-[4px_4px_0px_0px_#000]">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#f3e9d2] mb-2">Create Your NFT</h3>
              <p className="text-gray-400 text-lg">
                Upload your artwork, music, or any digital asset and set your preferences
              </p>
            </div>
          </div>

          <div data-aos="fade-up" className="flex items-center space-x-6 bg-[#292524] p-6 rounded-xl border-2 border-[#3e3834]">
            <div className="flex-shrink-0 w-16 h-16 bg-[#fca311] rounded-full flex items-center justify-center text-[#292524] font-bold text-3xl border-2 border-[#f3e9d2] shadow-[4px_4px_0px_0px_#000]">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#f3e9d2] mb-2">List or Share</h3>
              <p className="text-gray-400 text-lg">
                List your NFT for sale on the marketplace or share it as a free collectible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mint Section */}
      {connected ? (
        <section data-aos="fade-out" id="mint" className="max-w-3xl mx-auto">
          <div className="card-sketch-dark p-8">
            <h2 className="text-4xl text-center mb-8 text-[#fca311]">Mint Your NFT</h2>
            <MintForm account={account} />
          </div>
        </section>
      ) : (
        <section className="max-w-2xl mx-auto text-center py-12">
          <div data-aos="flip-left" className="card-sketch-dark p-12">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-[#f3e9d2] mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Connect your wallet to start minting and trading NFTs on AlgoFi
            </p>
            <button className="btn-sketch-secondary opacity-50 cursor-not-allowed">
              Connect Wallet First
            </button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section data-aos="flip-right" className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-[#292524] rounded-2xl p-12 border-2 border-[#fca311] shadow-[8px_8px_0px_0px_#000]">
          <h2 className="text-4xl font-bold text-[#f3e9d2] mb-4">
            Join the AlgoRand Community
          </h2>
          <p className="text-gray-300 mb-8 text-xl">
            Be part of the next generation of digital creators and collectors
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/algorand"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sketch-secondary"
            >
              Join Discord
            </a>
            <a
              href="https://twitter.com/algorand"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sketch-secondary"
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