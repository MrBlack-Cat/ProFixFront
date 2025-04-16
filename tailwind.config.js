// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       animation: {
//         'fade-in-up': 'fadeInUp 0.3s ease-out',
//       },
//       keyframes: {
//         fadeInUp: {
//           '0%': {
//             opacity: '0',
//             transform: 'translateY(20px)',
//           },
//           '100%': {
//             opacity: '1',
//             transform: 'translateY(0)',
//           },
//         },
//       },
//     },
//   },
//   plugins: [],
// };




//** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientx: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        chatBlue: '#3b82f6',
        chatGray: '#f3f4f6',
        chatDark: '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
