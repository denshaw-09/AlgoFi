/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS variables
        sketch: {
          bg: 'var(--color-bg)',
          'bg-secondary': 'var(--color-bg-secondary)',
          text: 'var(--color-text)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-muted': 'var(--color-text-muted)',
          cream: 'var(--color-cream)',
          mustard: 'var(--color-mustard)',
          'dark-text': 'var(--color-dark-text)',
          border: 'var(--color-border)',
          shadow: 'var(--color-shadow)',
          'card-bg': 'var(--color-card-bg)',
          'card-dark-bg': 'var(--color-card-dark-bg)',
          'input-bg': 'var(--color-input-bg)',
          'creator-bg': 'var(--color-creator-bg)',
          'svg-fill': 'var(--color-svg-fill)',
        },
        // Legacy colors
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}