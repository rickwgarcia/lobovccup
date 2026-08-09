/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: '#077A86',
        'brand-gray': '#63666A',
        'brand-silver': '#A7A8AA',
        ink: '#000000',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        h1: ['44px', { lineHeight: '1.15', fontWeight: '500' }],
        h2: ['30px', { lineHeight: '1.15', fontWeight: '500' }],
        h3: ['23px', { lineHeight: '1.2', fontWeight: '500' }],
        h4: ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'h4-mobile': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        body: ['16px', { lineHeight: '1.55', fontWeight: '400' }],
      },
      borderRadius: {
        card: '28px',
        btn: '12px',
        pill: '6px',
      },
      boxShadow: {
        hard: '0px 3px 0px 0px #000000',
      },
    },
  },
  plugins: [],
};
