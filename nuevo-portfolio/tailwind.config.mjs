/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            /* ─── COLOR PALETTE ─── */
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                accent: {
                    DEFAULT: '#fbbf24',        // Amber-400 — the signature gold
                    light: '#fcd34d',          // Amber-300
                    dark: '#f59e0b',           // Amber-500
                },
                surface: {
                    DEFAULT: '#292524',        // Stone-800 — cards, modals
                    light: '#44403c',          // Stone-700
                    dark: '#1c1917',           // Stone-900 — body bg
                },
                muted: {
                    DEFAULT: '#78716c',        // Stone-500
                    foreground: '#a8a29e',     // Stone-400
                },
            },

            /* ─── TYPOGRAPHY ─── */
            fontFamily: {
                heading: ['"Syncopate"', 'sans-serif'],
                body: ['"Space Grotesk"', 'sans-serif'],
                mono: ['"Space Mono"', 'monospace'],
            },

            /* ─── BORDER RADIUS ─── */
            borderRadius: {
                lg: '0.75rem',
                md: '0.5rem',
                sm: '0.25rem',
            },

            /* ─── ANIMATIONS ─── */
            keyframes: {
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-right': {
                    from: { transform: 'translateX(100%)' },
                    to: { transform: 'translateX(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
            },
        },
    },
    plugins: [],
};
