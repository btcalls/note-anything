const { ColorsToConfig, ColorsToPlugin } = require('./constants/colors');

const { hairlineWidth } = require('nativewind/theme');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: ColorsToConfig,
      fontFamily: {
        'space-mono': ['SpaceMono', ...fontFamily.mono],
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    ({ addBase }) => addBase(ColorsToPlugin),
    ({ addUtilities }) => {
      // NOTE: For custom utilities to be picked up by IntelliSense
      addUtilities({
        '.skeleton': {
          '@apply animate-pulse rounded-md bg-gray-200 dark:bg-gray-700': {},
        },

        '.btn-form': {
          '@apply h-14 flex-1 items-center justify-center rounded-xl border-2 border-foreground bg-background':
            {},
        },

        '.btn-cancel': {
          '@apply h-14 flex-1 items-center justify-center rounded-xl border-2 border-destructive bg-destructive':
            {},
        },
      });
    },
  ],
};
