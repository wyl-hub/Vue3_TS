import { Module } from "vuex"
import { getPageList } from '@/service/main/system/system'
import type { IRootState } from "@/store/types"
import type { ISystemState, IPageTableForm } from "./types"


const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            userList: [],
            total: 0
        }
    },
    mutations: {
        setPageList(state, payload: { list: any[], total: number }) {
            const { list, total } = payload
            state.userList = list
            state.total = total
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: { data: IPageTableForm }) {
            const { data } = payload
            const result = await getPageList(data)
            commit('setPageList', result)
        }
    }
}

export default systemModule