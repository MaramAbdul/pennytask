/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/frontend/src/**/*.{html,ts,css}', // ✅ Ensures Tailwind scans all files
  ],
  theme: {
    extend: {}, // Customize Tailwind styles here
  },
  plugins: [],
};
