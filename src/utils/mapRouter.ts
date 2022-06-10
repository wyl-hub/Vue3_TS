import type { RouteRecordRaw } from 'vue-router'
import type { IMenuItem } from '@/service/login/types'

export function mapRouter(menuList: IMenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 先加载所有路由
  const allRoutes: RouteRecordRaw[] = []
  const routesFiles = require.context('../router/main', true, /\.ts/)
  routesFiles.keys().forEach(item => {
    const route = require('@/router/main' + item.split('.')[1])
    const path = route.default.path
    if (recursionRoute(menuList, path)) allRoutes.push(route.default)
  })
  return allRoutes 
}

function recursionRoute(arr: IMenuItem[], path: string): boolean {
  let result = false
  arr.forEach(item => {
    if (item.children && item.children.length > 0) {
      result = recursionRoute(item.children, path)
    } else {
      if (item.url === path) result = true
    }
  })
  return result
}