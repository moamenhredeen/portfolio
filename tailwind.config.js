
/** @type
 * {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      cursor: {
        'navigate': 'url(/images/navigation.svg), move'
      }
    },
  },
  plugins: [],
}

