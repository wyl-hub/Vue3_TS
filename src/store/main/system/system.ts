import { Module } from "vuex"
import { getPageList } from '@/service/main/system/system'
import type { IRootState } from "@/store/types"
import type { ISystemState } from "./types"


const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            userList: []
        }
    },
    mutations: {

    },
    actions: {
        async getPageListAction() {
            const result = await getPageList({
                offset: 0,
                size: 10
            })
            console.log(result)
        }
    }
}

export default systemModule