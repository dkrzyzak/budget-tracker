import { reactRouter } from '@react-router/dev/vite';
// import { reactRouterDevTools } from 'react-router-devtools';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import circularDeps from 'vite-plugin-circular-dependency';

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    plugins: [
        circularDeps({
            include: './app/**/*.{ts,tsx}',
        }),
        // reactRouterDevTools(),
        reactRouter(),
        tsconfigPaths(),
    ],
});
