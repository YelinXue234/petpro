export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: { brand: '#FF8C42', deep: '#E5722A', soft: '#FFD4B8' },
        mint:   { brand: '#7FD8BE', deep: '#4FB89A', soft: '#D6F2E8' },
        yellow: { brand: '#FFD93D', soft: '#FFF1B3' },
        cream:  '#FFF9F2',
        ink:    { 900: '#3D2E1F', 700: '#6B5947', 500: '#9A8975', 300: '#D4C7B5' },
      },
      fontFamily: {
        display: ['Fraunces', 'Nunito', 'Noto Sans SC', 'PingFang SC', 'sans-serif'],
        sans:    ['Nunito', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      borderRadius: {
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(61, 46, 31, 0.06)',
        'pop':  '0 8px 24px rgba(255, 140, 66, 0.25)',
        'card': '0 4px 16px rgba(61, 46, 31, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}