import request from "@/service";
import type { IPageList } from './types'
import type { IPageTableForm } from '@/store/main/system/types'
 
export const getPageList = (pageName: string, data: IPageTableForm) => {
    return request.post<IPageList>({ url: `/page/get${pageName}List`, data})
}