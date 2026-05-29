/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2F0E9', // Crème
        foreground: '#1A1A1A', // Charbon
        primary: '#2E4036',    // Mousse
        accent: '#CC5833',     // Argile
        dark: '#0A0D0B',       // Very dark mousse for footer
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
