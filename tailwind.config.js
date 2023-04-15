/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{jsx,js}",
    // Path to the tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        "appear-top": "appear 1s"
      },
      gridTemplateColumns: {
        desktop_lg: "250px 1fr",
        desktop_xl: "350px 1fr",
      },
      boxShadow: {
        shadowBlack: '1px 1px 7px 0 black',
        shadowBoxOutline: "0 0 6px 1px black",
        shadowRigth: "2px 0px 6px 0 black"
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '20%': '20%',
        "90%": "90%"
      },
      width: {
        "25%": "25%"
      },
      borderRadius: {
        "40px": "40px"
      },
      scrollbar: {
        width: '4px',
        height: '8px',
        track: '#f1f1f1',
        thumb: '#888',
      },
      backgroundColor: {
        "greenGray": "#EDF1D6",
        "veryLigthGreen": "#E5D9B6",
        "ligthGreen": "#A4BE7B",
        "mediumGreen": "#5F8D4E",
        "darkGreen": "#285430"
      },
      scale: {
        "130": "1.3"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}