/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C0E",        // page background — projection-room black
        smoke: "#16181C",      // raised surfaces
        line: "#2A2D33",       // hairline borders
        bone: "#EDEAE3",       // primary text
        mute: "#8B8F98",       // secondary text
        signal: "#E8B44A",     // tungsten-lamp accent (record light / set light)
        rec: "#E4573D",        // recording red, used sparingly
      },
      fontFamily: {
        display: ['"Poppins"', "sans-serif"],
        body: ['"Poppins"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};
