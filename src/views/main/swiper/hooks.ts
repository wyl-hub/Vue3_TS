import { getSeqList, saveSwiper, getSwiperInfo, deleteSwiper } from '@/service/main/swiper/swiper'
import { Ref } from 'vue'
import { useGetTableList } from '@/baseUi/table/hooks'
import { message } from '@/utils/utils'

export const useSeqList = (seqList: Ref<any[]>) => {
    getSeqList().then(res => {
        seqList.value = res as any[]
        seqList.value.unshift(' ')
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

export const useSwiperInfo = (id, form, fileList, seqList) => {
    getSwiperInfo(id).then(res => {
        form.name = res.name
        form.seq = res.seq
        fileList.value[0] = {
            name: res.name,
            url: res.url,
            uid: res.id
        }
        if (typeof res.seq === 'number') {
            if (res.seq === 5 || seqList.value.length <= 1) {
                seqList.value.push(res.seq)
            } else if (seqList.value.length > 1) {
                for (let i = 1; i < seqList.value.length; ++i) {
                    if (seqList.value[i] > res.seq) {
                        seqList.value.splice(i, 0, res.seq)
                        break
                    }
                }
            }
        }
    })
}

export const useDeleteSwiper = (id, func) => {
    deleteSwiper(id).then(res => {
        func()
    })
}