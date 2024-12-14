/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontSize: {
                'fluid': 'max(min(3vw, 16px), 12px)'
            }
        },
    },
    plugins: [],
};
