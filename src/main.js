import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// npm install element-plus --save
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//導入中文
import zhTw from 'element-plus/es/locale/lang/zh-tw'
// 導入icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// # .scss and .sass
// npm add -D sass


import App from './App.vue'
import router from './router'
//引入pinia持久化套件
import piniaPersist from 'pinia-plugin-persist'
import dayjs from 'dayjs'


const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.provide('dayjs', dayjs) // 將dayjs注入到應用中
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhTw,
  })
app.use(pinia)
app.use(router)

app.mount('#app')
