import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'
import { verifyToken } from '@/service/login/login'
import Login from '@/views/login/login.vue'

let isFirst = true

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/home',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/main/home',
        name: 'home',
        component: () => import('@/views/main/home/home.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 首次启动项目 如果storage中有菜单 先注册菜单
if (isFirst) {
  const routes = window.localStorage.getItem('routes')
  if (routes) {
    const arr = JSON.parse(routes)
    for (let item of arr) {
      const tempArr = item.path.split('/')
      const componentName = tempArr[tempArr.length - 1]
      item.component = () => import(`@/views${item.path}/${componentName}.vue`)
      router.addRoute('main', item)
    }
  }
  isFirst = false
}

router.beforeEach((to) => {
  const token = window.localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return '/login'
  }
})

export default router