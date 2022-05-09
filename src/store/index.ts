import { createStore } from 'vuex'
import login from './login/login'
import type { IRootState } from './types'

export default createStore<IRootState>({
  state: {
    name: 'wyl'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login
  }
})
