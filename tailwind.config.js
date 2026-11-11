/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.hbs',
    './partials/**/*.hbs',
    './assets/js/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#090a10',
          darker: '#05060a',
          surface: '#10121d',
          card: '#141726',
          hover: '#1a1e32',
          cyan: '#ffb000',
          amber: '#ffb000',
          magenta: '#ff0055',
          pink: '#ff2a85',
          yellow: '#ffe600',
          green: '#00ff66',
          purple: '#9d4edd',
          border: 'rgba(255, 176, 0, 0.2)',
          'border-hover': 'rgba(255, 176, 0, 0.6)',
          'border-card': 'rgba(255, 255, 255, 0.08)',
          text: '#e2e8f0',
          bright: '#ffffff',
          muted: '#8b9bb4',
          dim: '#4b586e',
        },
      },
      fontFamily: {
        display: ['var(--gh-font-heading)', 'Orbitron', 'system-ui', 'sans-serif'],
        body: ['var(--gh-font-body)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(255, 176, 0, 0.4)',
        'glow-cyan-lg': '0 0 25px rgba(255, 176, 0, 0.7)',
        'glow-amber': '0 0 15px rgba(255, 176, 0, 0.4)',
        'glow-amber-lg': '0 0 25px rgba(255, 176, 0, 0.7)',
        'glow-magenta': '0 0 15px rgba(255, 0, 85, 0.4)',
        'glow-green': '0 0 15px rgba(0, 255, 102, 0.4)',
      },
    },
  },
  plugins: [],
};
