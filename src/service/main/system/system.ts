import request from "@/service";
import type { IPageList } from './types'
import type { IPageTableForm } from '@/store/main/system/types'
 
export const getPageList = (data: IPageTableForm) => request.post<IPageList>({ url: '/customer/getCustomerList', data})