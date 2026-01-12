import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PeraWalletConnect } from '@perawallet/connect';
import Header from './components/Header';
import Home from './views/Home';
import Marketplace from './views/Marketplace';
import Portfolio from './views/Portfolio';
import ScrollToTop from './components/ScrollToTop';

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

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
        <footer className="bg-slate-900/50 backdrop-blur-lg border-t border-purple-500/20 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">AlgoFi</h3>
                <p className="text-gray-400 mb-8">
                  Decentralized NFT marketplace on Algorand for artists, musicians, and creators.
                </p>
                <div className="flex space-x-6">
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
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-gray-400 hover:text-purple-400 transition">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/marketplace" className="text-gray-400 hover:text-purple-400 transition">
                      Marketplace
                    </a>
                  </li>
                  <li>
                    <a href="/portfolio" className="text-gray-400 hover:text-purple-400 transition">
                      Portfolio
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="https://developer.algorand.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition"
                    >
                      Algorand Docs
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://testnet.algoexplorer.io/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition"
                    >
                      TestNet Explorer
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://bank.testnet.algorand.network/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition"
                    >
                      TestNet Dispenser
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 AlgoFi. Built on Algorand TestNet. 
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;