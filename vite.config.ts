import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}
* @license ${pkg.license}
*/`;

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VMapbox',
      formats: ['es', 'cjs', 'umd'],
      fileName: pkg.name,
    },
    commonjsOptions: {
      extensions: ['.js', '.ts', '.vue'],
      exclude: 'src/**',
      include: 'node_modules/**',
    },
    rollupOptions: {
      external: [
        'vue',
        'maplibre-gl',
        '@deck.gl/layers',
        '@deck.gl/mapbox',
        '@deck.gl/core',
      ],
      output: {
        exports: 'named',
        banner,
        strict: true,
        sourcemap: true,
        globals: {
          vue: 'vue',
          'maplibre-gl': 'maplibreGl',
          '@deck.gl/mapbox': 'deckGlMapbox',
          '@deck.gl/layers': 'deckGlLayers',
          '@deck.gl/core': 'deckGlCore',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'v-mapbox.css';
          return assetInfo.name;
        },
      },
    },
  },
});
