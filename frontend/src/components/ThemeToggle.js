import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105"
      style={{
        backgroundColor: 'var(--color-toggle-bg)',
        borderColor: 'var(--color-border)',
        boxShadow: '2px 2px 0px 0px var(--color-shadow)'
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        // Sun icon - shown in dark mode (click to switch to light)
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="var(--color-mustard)"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Moon icon - shown in light mode (click to switch to dark)
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="var(--color-text)"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
