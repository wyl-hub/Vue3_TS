import request from "@/service"
import type { ISortInfo } from './type'

export const saveSort = data => request.post({ url: '/sort/save', data })

export const getSortInfo = (id: number) => request.post<ISortInfo>({ url: '/sort/getInfo', data: { id } })

export const deleteSort = id => request.post({ url: '/sort/delete', data: { id } })