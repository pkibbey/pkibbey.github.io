/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          light: 'rgb(242, 244, 248)',
          DEFAULT: 'rgb(19, 23, 31)',
        },
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
      minHeight: {
        stretch: 'calc(100vh - 196px)',
      },
    },
  },
  plugins: [],
};
