import { fileURLToPath, URL } from 'node:url'
import { rm } from 'node:fs/promises';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
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
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "visualizer.html",
      open: true
    })
  ],
  build: {
    outDir: 'dist',
    minify: true,
    cssCodeSplit: true,
    commonjsOptions: {
      esmExternals: true
    },
    rollupOptions: {
      external: ['vue',
        '@kangc/v-md-editor@next',
        '@kangc/v-md-editor/lib/preview.js',
        '@kangc/v-md-editor/lib/style/preview.css',
        '@kangc/v-md-editor/lib/theme/github.js',
        '@kangc/v-md-editor/lib/theme/style/github.css'],
      output: {
        globals: {
          vue: 'Vue',
          '@kangc/v-md-editor@next': 'KangcVMdEditor'
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
