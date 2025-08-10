/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ge: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7ff',
          300: '#a5a5ff',
          400: '#8181ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          500: '#f97316',
        }
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn-primary': {
          '@apply bg-ge-600 hover:bg-ge-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ge-500 focus:ring-offset-2': {},
        },
        '.btn-outline': {
          '@apply border-2 border-ge-600 text-ge-600 hover:bg-ge-600 hover:text-white font-semibold py-3 px-6 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ge-500 focus:ring-offset-2': {},
        },
        '.chip': {
          '@apply bg-ge-100 text-ge-700 px-3 py-1 rounded-full text-sm font-medium': {},
        },
      })
    }
  ],
}
