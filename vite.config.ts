import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'), // Алиас @ для папки src
    },
  },
  build: {
    lib: {  
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vuper',
      fileName: (format) => `vuper.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
    sourcemap: true, // Генерация sourcemaps
    cssCodeSplit: true, // Разделение CSS по модулям
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});