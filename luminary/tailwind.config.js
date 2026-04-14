/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#060608',
        surface: '#0d0d12',
        surfaceHighlight: '#1a1a24',
        accentViolet: '#8a2be2',
        accentCyan: '#00ffff',
        accentGold: '#ffd700',
        textPrimary: '#ffffff',
        textSecondary: '#a0a0ab',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        subheading: ['"Instrument Serif"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'iridescent-gradient': 'linear-gradient(135deg, #8a2be2, #00ffff, #ffd700)',
        'mesh-glow': 'radial-gradient(circle at 50% 50%, rgba(138,43,226,0.15) 0%, rgba(6,6,8,0) 50%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
