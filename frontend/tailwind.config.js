// tailwind.config.js
import withMT from "@material-tailwind/react/utils/withMT";
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the glob pattern according to your file types
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})
