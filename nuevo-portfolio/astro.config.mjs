// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    site: 'https://chimelis.art',
    output: 'static',
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        },
    }),

    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false, // We use our own global.css
        }),
    ],

    image: {
        // Allow remote images from Wix CDN (artwork source)
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.wixstatic.com',
            },
        ],
    },

    vite: {
        ssr: {
            // Required for Cloudflare Workers compatibility
            external: ['node:buffer', 'node:crypto'],
        },
    },
});
