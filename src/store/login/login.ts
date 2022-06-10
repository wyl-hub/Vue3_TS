import { Module } from "vuex"
import { mapRouter } from '@/utils/mapRouter'
import { toLogin, getMenu, verifyToken } from '@/service/login/login'
import type { IRootState } from "../types"
import type { ILoginState } from './types'
import type { ILoginForm, IMenuItem } from '@/service/login/types'
import type { Router } from "vue-router"
import router from "@/router"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      token: '',
      userMenu: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, menuList: IMenuItem[]) {
      state.userMenu = menuList
      const storageMenu = window.localStorage.getItem('routes')
      if (storageMenu) return
      console.log(1)
      const routes = mapRouter(menuList)
      for (let item of routes) {
        router.addRoute('main', item)
      }
      window.localStorage.setItem('routes', JSON.stringify(routes))
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: { data: ILoginForm, router: Router }) {
      const { data, router } = payload
      const result = await toLogin(data)
      const { userInfo, token } = result
      commit('changeToken', token)
      commit('changeUserInfo', userInfo)
      // 使用用户角色 获取对应的菜单
      window.localStorage.setItem('token', token)
      router.push('/')
    },

    async getDetailByToken({ commit }) {
      const result = await verifyToken()
      const { userInfo, menuList } = result
      commit('changeUserInfo', userInfo)
      commit('changeUserMenu', menuList)
    }
  }
}

export default loginModule