import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json'
    }),
    libCss()
  ],
  build: {
    outDir: 'dist',
    minify: true,
    cssCodeSplit: true,
    rollupOptions:{
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
      fileName:(format) => `components.${format}.js`,
      formats: ['umd', 'es', 'cjs']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples', import.meta.url))
    }
  }
})
