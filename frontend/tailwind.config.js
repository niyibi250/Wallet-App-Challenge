/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: '#006B32',
        Grey: {
          100: '#232429',
          80: '#55565B',
          50: '#919297',
          30: '#C1C2C7',
          5: '#ECECED'
        },
        Bleu_De_France: '#2C6CE5',
        Jungle_Green: '#1F9B6E',
        White_Smoke: '#F5F5F5',
        Red:'#E35454',
        Redish:'#E1A154',
        Blueish:'#23B6E4',
        Blue:'#376DD6',
        BlueDark:'#7508E3',
        Green:'#24C779',
        Greenish:'#95c485',
        Yellow:'#E0CD1C'
      },
      fontFamily: {
        main: ["Roboto", "serif"],
        accent: ["Space Grotesk", "serif"],
        logo: ["Cabin", "serif"],
      },
    },
  },
  plugins: [],
};


