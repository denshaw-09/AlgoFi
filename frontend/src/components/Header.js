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
    <header className="bg-[#1c1917]/90 backdrop-blur-md border-b-2 border-[#3e3834] sticky top-0 z-50 pt-2 pb-2">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-bold text-[#f3e9d2] group-hover:text-[#fca311] transition-colors font-['Fredoka_One']">
              AlgoFi
            </span>
          </Link>

          {/* navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition relative group ${isActive(link.path)
                    ? 'text-[#fca311]'
                    : 'text-[#f3e9d2] hover:text-[#fca311]'
                  }`}
              >
                {link.label}
                {/* Underline sketch effect */}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#fca311] transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </div>

          {/* wallet connect */}
          <div className="hidden md:block">
            {connected ? (
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-[#292524] rounded-lg border-2 border-[#3e3834]">
                  <span className="text-[#fca311] font-medium font-mono">
                    {formatAddress(account)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-[#292524] hover:bg-red-900/30 text-red-400 border-2 border-red-900/50 rounded-lg font-medium transition font-['Fredoka_One']"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="btn-sketch-primary"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f3e9d2] hover:text-[#fca311]"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
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
          <div className="md:hidden mt-4 space-y-4 bg-[#292524] p-4 rounded-xl border-2 border-[#3e3834]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium text-lg ${isActive(link.path)
                    ? 'bg-[#fca311] text-black'
                    : 'text-[#f3e9d2] hover:bg-[#3e3834]'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#3e3834]">
              {connected ? (
                <>
                  <div className="px-4 py-2 bg-[#1c1917] rounded-lg border border-[#3e3834] mb-3 text-center">
                    <span className="text-[#fca311] font-medium text-sm font-mono">
                      {formatAddress(account)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-900/20 text-red-400 border-2 border-red-900/50 rounded-lg font-medium transition font-['Fredoka_One']"
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
                  className="w-full btn-sketch-primary"
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