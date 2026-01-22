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
        'newsprint': '#F9F9F7',
        'ink': '#111111',
        'muted': '#E5E5E0',
        'accent': '#CC0000',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
