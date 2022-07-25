import { saveSort, getSortInfo, deleteSort } from '@/service/main/product/sort/sort'
import { message } from '@/utils/utils'

export const useSaveForm = (data, emit) => {
    saveSort(data).then(res => {
        if (res === 'success') {
            message('保存成功', 'success')
            emit('update:showAdd', false)
        }
    })
}

export const useSortInfo = (id: number, form) => {
    getSortInfo(id).then(res => {
        form.name = res.name
        form.ifShow = res.ifShow === '1' ? true : false
    })
}

export const useDelete = (id, func) => {
    deleteSort(id).then(res => {
        func()
    })
}