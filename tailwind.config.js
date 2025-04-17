// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'gradient-x': 'gradient-x 4s ease infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'neon-blur': 'neonBlur 1.5s ease-in-out infinite',
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
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px #9333ea' },
          '50%': { boxShadow: '0 0 25px #9333ea' },
        },
        neonBlur: {
          '0%, 100%': { filter: 'blur(2px)' },
          '50%': { filter: 'blur(6px)' },
        },
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/line-clamp'), 
  ],
};
