// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      // Other customizations
    },
  },
  plugins: [
    require("preline/plugin"),
    function ({ addUtilities }) {
      const newUtilities = {
        /* Thin scrollbar for WebKit-based browsers */
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "6px", // Make it slightly larger for better visibility
        },
        ".scrollbar-thin::-webkit-scrollbar-track": {
          background: "transparent",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "8px",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
        /* Thin scrollbar for Firefox */
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
