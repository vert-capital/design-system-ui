// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const tailwindcssAnimate = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        display: ['Lato', 'sans-serif'],
      },
      screens: {
        mobile: { max: '767px' },
      },
      maxWidth: {
        content: '1440px',
      },
      fontSize: {
        xxs: [
          '0.65rem',
          {
            lineHeight: '1rem',
          },
        ],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: 'hsl(var(--background))',
          screen: 'hsl(var(--background-screen))',
        },
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
          sheet: 'hsl(var(--brand-sheet))',
          extra_light: 'hsl(var(--brand-extra-light))',
          light: 'hsl(var(--brand-light))',
          medium: 'hsl(var(--brand-medium))',
          dark: 'hsl(var(--brand-dark))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          extra_light: 'hsl(var(--success-extra-light))',
          light: 'hsl(var(--success-light))',
          medium: 'hsl(var(--success-medium))',
          dark: 'hsl(var(--success-dark))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          extra_light: 'hsl(var(--warning-extra-light))',
          light: 'hsl(var(--warning-light))',
          medium: 'hsl(var(--warning-medium))',
          dark: 'hsl(var(--warning-dark))',
        },
        neutral_low: {
          DEFAULT: 'hsl(var(--neutral-low-pure))',
          extra_light: 'hsl(var(--neutral-low-extra_light))',
          light: 'hsl(var(--neutral-low-light))',
        },
        neutral_high: {
          DEFAULT: 'hsl(var(--neutral-high-pure))',
          extra_light: 'hsl(var(--neutral-high-extra-light))',
          light: 'hsl(var(--neutral-high-light))',
          medium: 'hsl(var(--neutral-high-medium))',
          dark: 'hsl(var(--neutral-high-dark))',
        },
        helper: {
          DEFAULT: 'hsl(var(--helper))',
          extra_light: 'hsl(var(--helper-extra-light))',
          light: 'hsl(var(--helper-light))',
          medium: 'hsl(var(--helper-medium))',
          dark: 'hsl(var(--helper-dark))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fast-spin': 'spin 0.5s linear infinite',
        // 'fade-in': 'fadeIn 0.3s ease-in',
        // 'fade-out': 'fadeOut 0.3s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
