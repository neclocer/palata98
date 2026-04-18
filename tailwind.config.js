module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0, 0%, 20%)",
        input: "hsl(0, 0%, 20%)",
        ring: "hsl(0, 100%, 30%)",
        background: "hsl(0, 0%, 0%)",
        foreground: "hsl(0, 0%, 90%)",
        primary: {
          DEFAULT: "hsl(0, 100%, 30%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(0, 30%, 70%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        tertiary: {
          DEFAULT: "hsl(0, 0%, 20%)",
          foreground: "hsl(0, 0%, 95%)",
        },
        neutral: {
          DEFAULT: "hsl(0, 0%, 0%)",
          foreground: "hsl(0, 0%, 90%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 100%, 30%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsl(0, 0%, 15%)",
          foreground: "hsl(0, 0%, 60%)",
        },
        accent: {
          DEFAULT: "hsl(0, 0%, 20%)",
          foreground: "hsl(0, 0%, 95%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 10%)",
          foreground: "hsl(0, 0%, 90%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 10%)",
          foreground: "hsl(0, 0%, 90%)",
        },
        success: "hsl(120, 60%, 40%)",
        warning: "hsl(40, 90%, 55%)",
        gray: {
          50: "hsl(0, 0%, 98%)",
          100: "hsl(0, 0%, 90%)",
          200: "hsl(0, 0%, 80%)",
          300: "hsl(0, 0%, 60%)",
          400: "hsl(0, 0%, 45%)",
          500: "hsl(0, 0%, 35%)",
          600: "hsl(0, 0%, 25%)",
          700: "hsl(0, 0%, 15%)",
          800: "hsl(0, 0%, 10%)",
          900: "hsl(0, 0%, 0%)",
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        lg: "4px",
        md: "4px",
        sm: "4px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(0, 100%, 30%) 0%, hsl(0, 0%, 0%) 100%)',
        'gradient-2': 'linear-gradient(90deg, hsl(0, 0%, 15%) 0%, hsl(0, 0%, 0%) 100%)',
        'button-border-gradient': 'linear-gradient(90deg, hsla(0, 100%, 40%, 0.8), hsla(0, 0%, 50%, 0.8))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
