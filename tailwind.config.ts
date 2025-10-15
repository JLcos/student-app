import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Neo-Brutalist color palette - vibrant and high contrast
        primary: {
          DEFAULT: '#FF6B35', // vibrant orange
          light: '#FF8C61',
          dark: '#E84A19',
        },
        secondary: {
          DEFAULT: '#4ECDC4', // vibrant cyan
          light: '#7EDDD6',
          dark: '#3AB8AF',
        },
        accent: {
          yellow: '#FFE66D',
          pink: '#FF85C0',
          purple: '#9B5DE5',
          green: '#00F5A0',
          blue: '#00BBF9',
        },
        brutal: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#E5E5E5',
        },
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
      },
      borderWidth: {
        'brutal': '3px',
        'brutal-thick': '4px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config

