import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PeraWalletConnect } from '@perawallet/connect';
import Header from './components/Header';
import Home from './views/Home';
import Marketplace from './views/Marketplace';
import Portfolio from './views/Portfolio';
import ScrollToTop from './components/ScrollToTop';

// AOS for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

const Chains = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* top left chain */}
    <svg className="absolute -top-10 -left-5 w-40 h-80 text-[#000000] opacity-20" viewBox="0 0 100 300" fill="currentColor">
       {/* chain links */}
       <path d="M40,0 L60,0 L60,30 L40,30 Z" />
       <path d="M30,25 C10,25 10,55 30,55 L70,55 C90,55 90,25 70,25 Z M30,35 L70,35 C75,35 75,45 70,45 L30,45 C25,45 25,35 30,35 Z" />
       <path d="M40,50 L60,50 L60,80 L40,80 Z" />
       <path d="M30,75 C10,75 10,105 30,105 L70,105 C90,105 90,75 70,75 Z M30,85 L70,85 C75,85 75,95 70,95 L30,95 C25,95 25,85 30,85 Z" />
       <path d="M40,100 L60,100 L60,130 L40,130 Z" />
       {/* gear bottom*/}
       <circle cx="50" cy="180" r="40" />
       <circle cx="50" cy="180" r="15" fill="#1c1917" />
    </svg>
    
    {/*right side chain*/}
    <svg className="absolute -top-20 right-10 w-32 h-96 text-[#000000] opacity-20" viewBox="0 0 100 400" fill="currentColor">
       <path d="M45,0 L55,0 L55,400 L45,400 Z" />
       <circle cx="50" cy="380" r="30" />
    </svg>
  </div>
);

const Gears = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* gear bottom left*/}
    <svg className="absolute -bottom-32 -left-32 w-[600px] h-[600px] text-[#000000] opacity-10 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
      {/* gear - solid*/}
      <path d="M50 20 L55 5 L65 5 L70 20 L82 25 L95 18 L100 28 L90 38 L95 50 L110 55 L110 65 L95 70 L90 82 L100 92 L92 100 L82 90 L70 95 L65 110 L55 110 L50 95 L38 90 L28 100 L18 92 L25 82 L20 70 L5 65 L5 55 L20 50 L25 38 L18 28 L28 18 L38 25 Z M50 40 A10 10 0 1 0 50 60 A10 10 0 1 0 50 40 Z" />
    </svg>
    
    {/*gear - top right*/}
    <svg className="absolute top-40 -right-20 w-80 h-80 text-[#000000] opacity-10 animate-[spin_40s_linear_infinite_reverse]" viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 15 L56 5 L68 5 L74 15 L85 20 L95 12 L100 22 L90 32 L95 45 L110 50 L110 62 L95 67 L90 80 L100 90 L90 100 L80 90 L67 95 L62 110 L50 110 L45 95 L32 90 L22 100 L12 90 L20 80 L15 67 L0 62 L0 50 L15 45 L20 32 L12 22 L22 12 L32 20 Z M50 45 A5 5 0 1 0 50 55 A5 5 0 1 0 50 45 Z" />
    </svg>
  </div>
);

const Clouds = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* cl1*/}
    <svg className="absolute top-32 left-[15%] w-48 h-32 text-[#000000] opacity-20" viewBox="0 0 100 60" fill="currentColor">
      <path d="M20,50 Q5,50 5,35 Q5,20 20,20 Q25,5 45,10 Q60,0 75,15 Q90,15 90,35 Q90,50 75,50 Z" />
    </svg>
    
    {/*cl2*/}
    <svg className="absolute top-20 right-[20%] w-40 h-28 text-[#000000] opacity-20" viewBox="0 0 100 60" fill="currentColor">
      <path d="M25,50 Q10,50 10,35 Q10,20 25,20 Q30,5 50,10 Q65,0 80,15 Q95,15 95,35 Q95,50 80,50 Z" />
    </svg>

    {/*cl3 - small blob */}
    <svg className="absolute bottom-40 left-[10%] w-32 h-20 text-[#000000] opacity-15" viewBox="0 0 100 60" fill="currentColor">
      <path d="M20,50 Q10,50 10,40 Q10,30 20,30 Q25,20 40,25 Q50,15 60,25 Q70,25 70,40 Q70,50 60,50 Z" />
    </svg>
  </div>
);

function App() {
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [peraWallet] = useState(() => new PeraWalletConnect());

  // Disconnect wallet handler
  const handleDisconnectWallet = useCallback(() => {
    setAccount(null);
    setConnected(false);
  }, []);

  // Disconnect wallet function
  const disconnectWallet = useCallback(() => {
    peraWallet.disconnect();
    handleDisconnectWallet();
  }, [peraWallet, handleDisconnectWallet]);

  // Connect wallet function
  const connectWallet = async () => {
    setLoading(true);
    try {
      const newAccounts = await peraWallet.connect();
      
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnectWallet);

      if (newAccounts.length) {
        setAccount(newAccounts[0]);
        setConnected(true);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize wallet connection
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        // Try to reconnect existing session
        const accounts = await peraWallet.reconnectSession();
        if (accounts && accounts.length > 0) {
          console.log('Reconnected wallet:', accounts[0]); // Debug log
          setAccount(accounts[0]);
          setConnected(true);
        }

        // Setup disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWallet);

        // Setup connect event listener
        peraWallet.connector?.on("connect", (newAccounts) => {
          console.log('Wallet connected:', newAccounts[0]); // Debug log
          if (newAccounts && newAccounts.length > 0) {
            setAccount(newAccounts[0]);
            setConnected(true);
          }
        });
      } catch (error) {
        console.error('Wallet initialization error:', error);
      }
    };

    initializeWallet();

    return () => {
      // Cleanup event listeners
      peraWallet.connector?.off("disconnect", handleDisconnectWallet);
      peraWallet.connector?.off("connect");
    };
  }, [peraWallet, handleDisconnectWallet]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#1c1917] relative selection:bg-[#fca311] selection:text-black">
        {/* Background Elements */}
        <Chains />
        <Gears />
        <Clouds />

        <div className="relative z-10">
          <Header 
            account={account}
            connected={connected}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            loading={loading}
          />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route 
                path="/" 
                element={<Home account={account} connected={connected} />} 
              />
              <Route 
                path="/marketplace" 
                element={<Marketplace account={account} connected={connected} />} 
              />
              <Route 
                path="/portfolio" 
                element={<Portfolio account={account} connected={connected} />} 
              />
            </Routes>
          </main>
          <ScrollToTop />
          
          <footer className="mt-20 border-t-2 border-[#3e3834] bg-[#1c1917]/90 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-2xl text-[#f3e9d2] mb-4">AlgoFi</h3>
                  <p className="text-gray-400 mb-4">
                    Decentralized NFT marketplace on Algorand for artists, musicians, and creators.
                  </p>
                  <div className="flex space-x-6 mb-8">
                  <a href="https://github.com/denshaw-09/AlgoFi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                  <a href="https://twitter.com/algorand" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="https://discord.gg/algorand" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
                    </svg>
                  </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl text-[#f3e9d2] mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="/" className="text-gray-400 hover:text-[#fca311] transition">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/marketplace" className="text-gray-400 hover:text-[#fca311] transition">
                        Marketplace
                      </a>
                    </li>
                    <li>
                      <a href="/portfolio" className="text-gray-400 hover:text-[#fca311] transition">
                        Portfolio
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl text-[#f3e9d2] mb-4">Resources</h4>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://developer.algorand.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#fca311] transition"
                      >
                        Algorand Docs
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://lora.algokit.io/testnet" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#fca311] transition"
                      >
                        TestNet Explorer
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://bank.testnet.algorand.network/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#fca311] transition"
                      >
                        TestNet Dispenser
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-[#3e3834] mt-8 pt-8 text-center">
                <p className="text-gray-500">
                  © 2026 AlgoFi. Built on Algorand TestNet. 
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;