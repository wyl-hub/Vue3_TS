import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import request from './service'
import '@/assets/css/index.less'
// 全局引用
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'


const app = createApp(App)

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
