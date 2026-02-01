/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: '#0A0A0A',
        pearl: '#F8F6F3',
        champagne: '#E8DCC4',
        bronze: '#C9A876',
        sage: '#8B9B85',
        charcoal: '#2C2C2C',
        ivory: '#FFFEF9',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}