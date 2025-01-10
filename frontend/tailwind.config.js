/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-in-left": {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        "slide-in-right": {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        glowEffect: {
          '0%': {
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(255, 255, 255, 1)',
          },
          '100%': {
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          },
        },
        shine: {
          '0%': {
            backgroundPosition: '-200% 0', // Start from far left
          },
          '100%': {
            backgroundPosition: '200% 0', // Move to far right
          },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 1s ease-out",
        "slide-in-right": "slide-in-right 1s ease-out",
        glow: "glowEffect 1.5s ease-in-out infinite", // Glow effect animation
        shine: "shine 3s linear infinite", // Shine effect animation
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
