import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header({
  account,
  connected,
  connectWallet,
  disconnectWallet,
  loading,
}) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/portfolio", label: "Portfolio" },
  ];

  return (
    <header className="bg-sketch-bg/90 backdrop-blur-md border-b-2 border-sketch-border sticky top-0 z-50 pt-2 pb-2 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-bold text-sketch-text group-hover:text-sketch-mustard transition-colors font-['Fredoka_One']">
              AlgoFi
            </span>
          </Link>

          {/* navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition relative group ${
                  isActive(link.path)
                    ? "text-sketch-mustard"
                    : "text-sketch-text hover:text-sketch-mustard"
                }`}
              >
                {link.label}
                {/* Underline sketch effect */}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-sketch-mustard transform origin-left transition-transform duration-300 ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                ></span>
              </Link>
            ))}
          </div>

          {/* wallet connect + theme toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {connected ? (
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-sketch-bg-secondary rounded-lg border-2 border-sketch-border">
                  <span className="text-sketch-mustard font-medium font-mono">
                    {formatAddress(account)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                 className="w-full btn-sketch-primary"
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
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-sketch-text hover:text-sketch-mustard"
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 bg-sketch-bg-secondary p-4 rounded-xl border-2 border-sketch-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium text-lg ${
                  isActive(link.path)
                    ? "bg-sketch-mustard text-black"
                    : "text-sketch-text hover:bg-sketch-border"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-sketch-border">
              {connected ? (
                <>
                  <div className="px-4 py-2 bg-sketch-bg rounded-lg border border-sketch-border mb-3 text-center">
                    <span className="text-sketch-mustard font-medium text-sm font-mono">
                      {formatAddress(account)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn-sketch-primary"
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
                  {loading ? "Connecting..." : "Connect Wallet"}
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
