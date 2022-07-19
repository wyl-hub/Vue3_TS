import request from "@/service";
 
export const getSeqList = () => request.post({ url: '/swiper/getSeqList' })

export const saveSwiper = data => request.post({ url: '/swiper/save', data })