import { fileURLToPath, URL } from 'node:url'
import { rm } from 'node:fs/promises';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild:{
    pure: ['console.log'],
    drop: ['debugger']
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json'
    }),
    libCss(),
    obfuscatorPlugin(),
    {
      name: 'clean-examples',
      writeBundle() {
        rm('dist/examples_public', { recursive: true, force: true }); // remove 
      }
    },
  ],
  build: {
    outDir: 'dist',
    minify: true,
    cssCodeSplit: true,
    commonjsOptions: {
      esmExternals: true
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        dir: 'dist'
      }
    },
    lib: {
      entry: 'packages/index.ts',
      name: 'components',
      fileName: (format) => `components.${format}.js`,
      formats: ['umd', 'es', 'cjs']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples', import.meta.url))
    }
  }
})
