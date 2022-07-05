import request from "@/service";
import type { IPageList } from './types'

export const getPageList = (data) => request.post<IPageList>({ url: '/customer/getCustomerList', data})