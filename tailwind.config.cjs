/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                hub: {
                    bronze: '#B28B67',
                    black: '#0A0A0A',
                    gray: '#1F1F1F',
                }
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            },
        },
    },
    plugins: [],
}
