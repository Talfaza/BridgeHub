/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
      extend: {
        animation: {
          "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        },
        keyframes: {
          "border-beam": {
            "100%": {
              "offset-distance": "100%",
            },
          },
        },
      },
    },
}

