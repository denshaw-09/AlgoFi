import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rotating Gear */}
        <svg 
          className="absolute top-1/4 left-1/4 w-32 h-32 text-[#fca311] opacity-20 animate-[spin_20s_linear_infinite]" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M50 15 L56 5 L68 5 L74 15 L85 20 L95 12 L100 22 L90 32 L95 45 L110 50 L110 62 L95 67 L90 80 L100 90 L90 100 L80 90 L67 95 L62 110 L50 110 L45 95 L32 90 L22 100 L12 90 L20 80 L15 67 L0 62 L0 50 L15 45 L20 32 L12 22 L22 12 L32 20 Z M50 45 A5 5 0 1 0 50 55 A5 5 0 1 0 50 45 Z" />
        </svg>

        {/* Chain Link */}
        <svg 
          className="absolute bottom-1/4 right-1/4 w-24 h-48 text-[#fca311] opacity-20" 
          viewBox="0 0 100 200" 
          fill="currentColor"
        >
          <path d="M40,0 L60,0 L60,30 L40,30 Z" />
          <path d="M30,25 C10,25 10,55 30,55 L70,55 C90,55 90,25 70,25 Z M30,35 L70,35 C75,35 75,45 70,45 L30,45 C25,45 25,35 30,35 Z" />
          <path d="M40,50 L60,50 L60,80 L40,80 Z" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Number with Gradient */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-[#fca311] via-[#f3e9d2] to-[#fca311] bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f3e9d2]">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Oops! The page you're looking for seems to have been lost in the blockchain. 
            Let's get you back on track.
          </p>
        </div>

        {/* Broken Chain Icon */}
        <div className="mb-12 flex justify-center">
          <svg 
            className="w-24 h-24 text-[#fca311] opacity-60" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4"
          >
            {/* Left chain part */}
            <path d="M20,30 L20,50 C20,60 30,60 30,50 L30,30 C30,20 20,20 20,30 Z" />
            <rect x="15" y="25" width="20" height="10" rx="2" />
            
            {/* Right chain part */}
            <path d="M70,50 L70,70 C70,80 80,80 80,70 L80,50 C80,40 70,40 70,50 Z" />
            <rect x="65" y="55" width="20" height="10" rx="2" />
            
            {/* Broken link indicator */}
            <line x1="35" y1="40" x2="45" y2="50" strokeLinecap="round" />
            <line x1="55" y1="50" x2="65" y2="60" strokeLinecap="round" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="group relative px-8 py-4 bg-[#fca311] text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#fca311]/50 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              Go Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>

          <Link 
            to="/marketplace" 
            className="group relative px-8 py-4 bg-transparent border-2 border-[#fca311] text-[#fca311] font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#fca311] hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-[#fca311]/50 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              Browse Marketplace
            </span>
          </Link>
        </div>

        {/* Additional Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFound;