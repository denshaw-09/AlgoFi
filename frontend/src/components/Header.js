import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ account, connected, connectWallet, disconnectWallet, loading }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/portfolio', label: 'Portfolio' }
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div> */}
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AlgoFi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition ${isActive(link.path)
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:block">
            {connected ? (
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <span className="text-purple-400 font-medium">
                    {formatAddress(account)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed hover-glitter hover:scale-105 transform duration-300"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition ${isActive(link.path)
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-purple-500/20">
              {connected ? (
                <>
                  <div className="px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30 mb-2">
                    <span className="text-purple-400 font-medium text-sm">
                      {formatAddress(account)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    connectWallet();
                    setMobileMenuOpen(false);
                  }}
                  disabled={loading}
                  className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;