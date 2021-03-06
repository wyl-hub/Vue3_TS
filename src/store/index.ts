import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import type { IRootState, IStoreType } from './types'

export default createStore<IRootState>({
  state: {
    name: 'wyl',
    breadPath: []
  },
  mutations: {
    setBreadcrumbPath(state, data) {
      state.breadPath = data
    }
  },
  actions: {
    getBreadcrumbPath({ commit }, payload: { data: string[] }) {
      const { data } = payload
      commit('setBreadcrumbPath', data)
    }
  },
  modules: {
    login,
    system
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
