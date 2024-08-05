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

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhTw,
  })
app.use(createPinia())
app.use(router)

app.mount('#app')
