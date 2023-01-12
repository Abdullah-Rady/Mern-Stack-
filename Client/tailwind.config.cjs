/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   

    extend: {
      colors: {
        'p':"#1F2A40",
        's':"#141B2D",
        'i':"#323948",
        'ib':"#EEEEEE",
        'primary': "#222831",
        'secondary': "#393E46",
        'secondary-1':"#FFD369",
        'accent-1': "#33A9FF",
        'accent-2': "#0172C4",
        'accent-3': "#0070C1",
        'accent': "#EEEEEE",
        'warning-1': "#FAC661",
        'warning-2': "#F1AE2D",
        'warning-3': "#E39807",
        'positive-1': "#35DF90",
        'positive-2': "#1EB971",
        'positive-3': "#178F57",
        'negative-1': "#F47961",
        'negative-2': "#FF4545",
        'negative-3': "#FF0F0F",
        'text-primary-dark':"#d0d1d5",
        'text-nav-primary-dark':"#adadad",
        'text-secondary-dark':"#a3a3a3",
        'text-accent-dark':"#4cceac",
        'text-active-dark':"#6870FA",
        'yt': "#FF0000",
        'ph':"#FF6154",
        're': "#FF4500"

      },
      keyframes:{
        hover:{
          '0%':{transform : 'rotate(0deg)'},
          '25%':{transform: 'rotate(-15deg)'},
          '50%':{transform: 'rotate(0)'},
          '75%':{transform: 'rotate(15deg)'},
          '100%':{transform: 'rotate(0deg)'},
          
        }
      }
  
    },
  },
  plugins: [
  ],
}
