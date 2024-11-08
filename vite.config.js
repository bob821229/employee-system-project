import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build: {
  //   outDir: './docs', //===> 指派打包後要放的 資料夾路徑
  // },
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/employee-system-project/'
  // : '/'
})
