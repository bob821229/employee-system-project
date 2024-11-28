import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import dayjs from 'dayjs';
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
  define: {
    __APP_VERSION__: JSON.stringify(dayjs().format('YYYY_MM_DD-HH:mm:ss'))
  }
  // build: {
  //   outDir: './docs', //===> 指派打包後要放的 資料夾路徑
  // },
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/employee-system-project/'
  // : '/'
})
