import { Module } from "vuex"
import { getPageList } from '@/service/main/system/system'
import type { IRootState } from "@/store/types"
import type { ISystemState, IPageTableForm } from "./types"
import type { IPageList } from '@/service/main/system/types'


const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            userList: [],
            userTotal: 0,
            swiperList: [],
            swiperTotal: 0,
            sortList: [],
            sortTotal: 0
        }
    },
    mutations: {
        setPageList(state, payload: { pageName: string, result: IPageList }) {
            const { result, pageName } = payload
            state[`${pageName}List`] = result.list
            state[`${pageName}Total`] = result.total
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: { pageName: string, data: IPageTableForm }) {
            const { pageName, data } = payload
            const arr = pageName.split('')
            arr[0] = arr[0].toUpperCase()
            const result = await getPageList(arr.join(''), data)
            commit('setPageList', { pageName, result })
        }
    }
}

export default systemModule