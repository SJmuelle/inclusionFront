/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Fondos dinámicos
    {
      pattern: /bg-(red|blue|green|purple|pink|yellow|orange|teal|cyan|indigo|lime|emerald|fuchsia|rose|violet|sky|amber|stone|gray|slate)-(50|100|200|300|400|700)/,
    },
    // Bordes dinámicos
    {
      pattern: /border-(red|blue|green|purple|pink|yellow|orange|teal|cyan|indigo|lime|emerald|fuchsia|rose|violet|sky|amber|stone|gray|slate)-700/,
    },
    // Textos dinámicos
    {
      pattern: /text-(red|blue|green|purple|pink|yellow|orange|teal|cyan|indigo|lime|emerald|fuchsia|rose|violet|sky|amber|stone|gray|slate)-700/,
    },
    {
      // gradientes dinámicos "from"
      pattern: /from-(red|blue|green|purple|pink|yellow|orange|teal|cyan|indigo|lime|emerald|fuchsia|rose|violet|sky|amber|stone|gray|slate)-50/,
    },
    {
      // gradientes dinámicos "to"
      pattern: /to-(red|blue|green|purple|pink|yellow|orange|teal|cyan|indigo|lime|emerald|fuchsia|rose|violet|sky|amber|stone|gray|slate)-300/,
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
