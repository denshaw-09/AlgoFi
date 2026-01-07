import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          // TAILWIND EXPLANATION:
          // fixed bottom-8 right-8: positions it in the corner
          // bg-gradient-to-r from-purple-600 to-pink-600: matches the "Explore Marketplace" button gradient
          // rounded-full: makes it a perfect circle
          // z-50: ensures it floats above the dark cards
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 focus:outline-none"
          aria-label="Scroll to top"
        >
          {/* Simple Up Arrow SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;