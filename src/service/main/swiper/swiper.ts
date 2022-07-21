import request from "@/service";
import type { ISwiperInfo } from './type' 

export const getSeqList = () => request.post({ url: '/swiper/getSeqList' })

export const saveSwiper = data => request.post({ url: '/swiper/save', data })

export const getSwiperInfo = id => request.post<ISwiperInfo>({ url: '/swiper/getInfo', data: { id }})

export const deleteSwiper = id => request.post({ url: '/swiper/delete', data: { id } })