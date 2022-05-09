import { Module } from "vuex"
import { toLogin } from '@/service/login/login'
import type { IRootState } from "../types"
import type { ILoginState } from './types'
import type { ILoginForm } from '@/service/login/types'
import type { Router } from "vue-router"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      token: ''
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: { data: ILoginForm, router: Router }) {
      const { data, router } = payload
      const result = await toLogin(data)
      const { userInfo, token } = result
      commit('changeToken', token)
      commit('changeUserInfo', userInfo)
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
      router.push('/')
    }
  }
}

export default loginModule