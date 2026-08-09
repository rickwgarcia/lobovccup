/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: '#077A86',
        'brand-gray': '#63666A',
        'brand-silver': '#A7A8AA',
        ink: '#191A23',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        h1: ['60px', { lineHeight: '1.1', fontWeight: '500' }],
        h2: ['40px', { lineHeight: '1.1', fontWeight: '500' }],
        h3: ['30px', { lineHeight: '1.1', fontWeight: '500' }],
        h4: ['20px', { lineHeight: '1.4', fontWeight: '500' }],
        'h4-mobile': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        body: ['18px', { lineHeight: '1.55', fontWeight: '400' }],
      },
      borderRadius: {
        card: '45px',
        btn: '14px',
        pill: '7px',
      },
      boxShadow: {
        hard: '0px 5px 0px 0px #191A23',
      },
    },
  },
  plugins: [],
};
