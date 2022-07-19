import { getSeqList, saveSwiper } from '@/service/main/swiper/swiper'
import { useGetTableList } from '@/baseUi/table/hooks'
import { message } from '@/utils/utils'

export const useSeqList = (seqList) => {
    getSeqList().then(res => {
        seqList.value = res
    })
}

export const useSaveForm = (data, emit) => {
    saveSwiper(data).then(res => {
        if (res === 'success') {
            message('保存成功', 'success')
            emit('update:showAdd', false)
        }
    })
}