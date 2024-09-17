/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            // You can extend other theme properties here if needed
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.text-shadow': {
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                },
            };

            addUtilities(newUtilities, ['responsive', 'hover']);
        },
    ],
}