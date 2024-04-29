import type { Config } from 'tailwindcss'
import daisyui from 'daisyui';

export default {
  content: ['./examples/**/*.{js,ts,jsx,tsx,vue}', 'index.html', './packages/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
} satisfies Config

