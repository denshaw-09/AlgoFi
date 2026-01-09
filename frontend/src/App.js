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
                <p className="text-gray-400">
                  Decentralized NFT marketplace on Algorand for artists, musicians, and creators.
                </p>
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
                      href="https://lora.algokit.io/testnet" 
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