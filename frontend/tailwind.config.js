/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5F4A8B', // Ultra Violet
                secondary: '#FEFACD', // Lemon Chiffon
                accent: '#FEFACD', // Lemon Chiffon
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                display: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
