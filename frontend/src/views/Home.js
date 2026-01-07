import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import MintForm from '../components/MintForm';

function Home({ account, connected }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particleOptions = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: "#b4b8d6ff" }, 
      shape: { 
        type: "polygon", 
        options: { polygon: { sides: 4 } } // Diamond Shape
      },
      rotate: { 
        value: 45, // Side tilted diamonds
        animation: { enable: false } 
      },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
      links: { 
        enable: true, 
        distance: 150, 
        color: "#00d2ff", 
        opacity: 0.1, 
        width: 1 
      },
      move: { enable: true, speed: 1, outModes: "out" }
    }
  };

  const steps = [
    { n: '01', t: 'Connect Wallet', d: 'Connect your Pera Wallet or any Algorand-compatible wallet to get started.' },
    { n: '02', t: 'Create NFT', d: ' Upload your artwork, music, or any digital asset and set your preferences.' },
    { n: '03', t: 'List & Share', d: ' List your NFT for sale on the marketplace or share it as a free collectible.' }
  ];

  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh" />
      {init && <Particles id="tsparticles" options={particleOptions} />}

      <div className="relative z-10 space-y-32 pt-24 pb-24">
        
{/* HERO SECTION */}
<section className="relative px-6 max-w-7xl mx-auto min-h-[45vh] flex items-start justify-center pt-1 overflow-hidden">

<div className="absolute inset-0 pointer-events-none">
    {[
      // Top side
      { top: "5%", left: "15%", size: "2.8rem", delay: 0 },
      { top: "8%", right: "20%", size: "3rem", delay: 0.5 },

      // Bottom side
      { bottom: "5%", left: "20%", size: "2.6rem", delay: 1 },
      { bottom: "8%", right: "15%", size: "2.4rem", delay: 1.5 },

      // Left side
      { top: "25%", left: "3%", size: "2.4rem", delay: 2 },
      { top: "55%", left: "5%", size: "2.2rem", delay: 2.5 },

      // Right side
      { top: "30%", right: "3%", size: "2.6rem", delay: 3 },
      { top: "60%", right: "5%", size: "2.4rem", delay: 3.5 },
    ].map((d, i) => (
      <motion.div
        key={i}
        className="absolute"
        animate={{ y: [0, -18, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          delay: d.delay,
          ease: "easeInOut",
        }}
        style={{
          top: d.top,
          left: d.left,
          right: d.right,
          fontSize: d.size,
          opacity: 0.75,
          filter:
            "drop-shadow(0 0 18px rgba(56,189,248,0.6)) drop-shadow(0 0 32px rgba(236,72,153,0.45))",
        }}
      >
        💎
      </motion.div>
    ))}
  </div>
  {/* GLASS CONTENT BOX (CENTERED & LIGHTER) */}
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="
      relative z-10
     bg-white/5
      backdrop-blur-lg
      rounded-3xl
      p-9
      max-w-3xl
      border border-white/10
      shadow-xl
      text-center
    "
  >
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-3 text-white">
      Create, Trade & Collect
    </h1>
<h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
  NFTs on Algorand
</h2>


    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
      Testnet
    </h2>

    <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed mx-auto max-w-xl">
      AlgoFi is a decentralized NFT marketplace where artists and creators
      can mint, showcase, and trade digital assets with ease.
    </p>

    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        to="/marketplace"
        className="px-8 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-xl font-bold transition shadow-md shadow-cyan-400/30"
      >
        Explore Marketplace
      </Link>

      <a
        href="#mint"
        className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold transition shadow-md shadow-pink-500/30"
      >
        Start Minting
      </a>

      <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-white transition">
        Connect Wallet
      </button>
    </div>
  </motion.div>
</section>





        {/* STATS SECTION */}
        <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { v: '4.5s', l: 'Finality' },
            { v: '0.001', l: 'ALGO Fee' },
            { v: 'Eco', l: 'Eco-Friendly' }
          ].map((s, i) => (
            <div key={i} className="ultra-transparent-glass p-10 rounded-3xl text-center border-b border-cyan-500/10">
              <div className="text-5xl font-black mb-2 text-cyan-400">{s.v}</div>
              <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">{s.l}</p>
            </div>
          ))}
        </section>

        {/* FEATURES SECTION */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-bold text-center mb-16">Why AlgoFi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { i: '🎨', t: 'Art NFTs', d: 'Create and trade unique digital artwork on the Algorand blockchain.' },
              { i: '🎵', t: 'Music NFTs', d: 'Mint your music as NFTs and connect directly with your fans.' },
              { i: '💎', t: 'Standard NFTs', d: 'Create any type of digital collectible with ease.' },
              { i: '🔒', t: 'Secure', d: 'Built on Algorand for fast, secure, and low-cost transactions.' },
              { i: '🎁', t: 'Rewards', d: 'Mint non-purchasable NFTs for community engagement.' },
              { i: '⚡', t: 'Instant', d: 'Quick and easy NFT creation process with no technical knowledge needed.' }
            ].map((f, i) => (
              <div key={i} className="ultra-transparent-glass p-8 rounded-[2rem] group hover:border-rose-500/30">
                <div className="text-5xl mb-6 group-hover:scale-110 transition">{f.i}</div>
                <h3 className="text-2xl font-bold mb-2">{f.t}</h3>
                <p className="text-pink-500 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS (Redesigned as Steps Cards) */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-bold text-center mb-20"> How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <div key={i} className="ultra-transparent-glass p-12 rounded-[2.5rem] relative overflow-hidden group border-blue-800/10 hover:border-blue-600/40 ">
                <div className="text-8xl font-black absolute -right-4 -bottom-4 text-white/[0.02] group-hover:text-cyan-500/5 transition">
                  {step.n}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-400 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl mb-8 shadow-lg">
                  {step.n}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.t}</h3>
                <p className="text-black-500 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MINT SECTION */}
        <section id="mint" className="max-w-4xl mx-auto px-6">
          <div className="ultra-transparent-glass p-8 md:p-16 rounded-[3rem] border-rose-500/10">
<h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
  Ready to Get Started?
</h2>
            {connected ? (
              <MintForm account={account} />
            ) : (
             <div className="text-center py-10 bg-[#1a0f2e]/40 rounded-xl backdrop-blur-md">
  <p className="text-xl font-bold italic text-violet-300 mb-6">
    Connect your wallet to start minting and trading NFTs on AlgoFi
  </p>
  <button className="px-8 py-4 bg-violet-700/40 text-violet-200 rounded-lg font-bold text-lg cursor-not-allowed border border-violet-500/30">
    Connect Wallet First
  </button>
</div>

            )}
          </div>
        </section>

        {/* CTA SECTION */}
       <section className="max-w-6xl mx-auto px-6">
  <div className="ultra-transparent-glass p-16 rounded-[3rem] text-center 
                  border-violet-700/20 bg-[#1a0f2e]/30 backdrop-blur-md">
    
    <h2 className="text-4xl md:text-5xl font-black mb-6 italic 
                   bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
      Join the AlgoRand Community
    </h2>
    
    <p className="text-violet-200 mb-10 text-lg">
      Be part of the next generation of digital creators and collectors.
    </p>
    
    <div className="flex justify-center gap-6">
      <a href="https://discord.gg/algorand" 
         className="px-10 py-3 bg-violet-600/40 text-violet-100 font-bold rounded-full 
                    transition hover:scale-105 hover:bg-violet-500/50">
        Join Discord
      </a>
      <a href="https://twitter.com/algorand" 
         className="px-10 py-3 ultra-transparent-glass font-bold rounded-full 
                    border border-violet-500/30 text-violet-200 hover:border-violet-400/50">
        Follow on Twitter
      </a>
    </div>
  </div>
</section>


      </div>
    </div>
  );
}

export default Home;