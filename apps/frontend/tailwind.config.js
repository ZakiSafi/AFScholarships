/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
      boxShadow: {
        glow: '0 20px 50px -12px rgba(99, 102, 241, 0.45)',
        card: '0 8px 30px rgba(15, 23, 42, 0.08)',
        widget: '0 25px 60px -15px rgba(15, 23, 42, 0.15)',
      },
    },
  },
  plugins: [],
}
