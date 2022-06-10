import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import type { IRootState, IStoreType } from './types'

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

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
