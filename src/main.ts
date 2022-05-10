import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import request from './service'
import '@/assets/css/index.less'
// 全局引用
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
// 全局导入icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
// 全局注册
app.use(ElementPlus)
app.mount('#app')


// 3. .env 文件
// console.log(VUE_APP_BASE_NAME)
// console.log(process.env.NODE_ENV)
// console.log(process.env.BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
