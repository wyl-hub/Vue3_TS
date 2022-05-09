import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'
import { verifyToken } from '@/service/login/login'
import Login from '@/views/login/login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach(to => {
  const token = window.localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return '/login'
  } else {
  }
})

export default router