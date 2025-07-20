import sharedConfig from '@repo/tailwind-config';

/** @type {import('tailwindcss').Config} */
const config = {
  ...sharedConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../ui/src/**/*.{js,ts,jsx,tsx}'],
};

export default config;
