/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      rotate:{
        '_45': '-45deg'
      },
      animation: {
        shine: 'shine 1.5s linear infinite',
        lines: 'moveLines 10s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': {
            backgroundPosition: '200% 0',
          },
          '100%': {
            backgroundPosition: '0 0',
          },
        },
        moveLines: {
          '0%': {
            backgroundPosition: '100% 0',
          },
          '100%': {
            backgroundPosition: '0 0',
          },
        },
      },
      backgroundImage: {
        'docker_image': 'url(/assets/wp8114614-docker-wallpapers.png)',
        'docker_logo': 'url(/assets/docker_logo.png)',
        'nca_google': 'url(/assets/nca_google_2.png)',
        'docker_bg': 'url(/assets/docker_bg.jpg)'
      },
      backgroundPosition : {
        'left-20': '11%'
      },
      transitionProperty: {
        'width': 'width',
      },
      backgroundSize: {
        '60%': '60%',
        '200%': '200%',
      },
      borderWidth:{
        '3': '3px',
      },
      colors:{
        blue:{
          550: '#339BFF',
          750: '#4636FF'
        },
        sky:{
          450: '#03C2FF'
        },
        indigo:{
          650: '#5C4CFE'
        },
        gray:{
          1: '#C8D1D7',
          2: '#ACB4BA',
          3: '#747474',
          4: "#777777"
        },
      },
      spacing: {
        '128': '32rem',
      },
      maxWidth:{
        700: '700px'
      },
      width:{
        700: '700px', 
        600: '600px',
        3.5: '14px',
        4.5: '18px',
        7.5: '30px',
        30: '30rem',
        45: '180px'
      },
      height:{
        684: '684px',
        3.5: '14px',
        4.5: '18px',
        7.5: '30px',
        13: '50px',
        15: '60px'
      },
      top:{ 
        144: '-114px'
      },
      left:{ 
        144: '-114px'
      },
      fontFamily:{
        roboto: ['Roboto', 'sans-serif'],
        Italianno: ["Italianno", "cursive"],
      },
      padding:{
        2.5: '10px'
      },
      boxShadow: {
        'container' : '10px 0px 15px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4636FF",
          "secondary": "#03C2FF",
          "accent": "#5C4CFE",
          "neutral": "#339BFF",
          "base-100": "#FFFFFF",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#ffff00",
          "error": "#ff0000",
        },
      },
    ],
  },
  plugins: [
    require(getDaisyUI()), 
    require(getTypography())
  ],
};

function getDaisyUI() {
  return "daisyui";
}

function getTypography(){
  return "@tailwindcss/typography";
}
