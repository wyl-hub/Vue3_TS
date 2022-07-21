import { ElMessage, ElMessageBox } from 'element-plus'
import { computed } from 'vue'
import { useStore } from '@/store'
import type { IPageTableForm } from '@/store/main/system/types'

// 根据页面名称获取对应表格数据
export const useGetTableList = (pageName: string, data: IPageTableForm) => {
    const store = useStore()
    store.dispatch('system/getPageListAction', { pageName, data })
    const tableList = computed(() => store.state.system[`${pageName}List`])
    const total = computed(() => store.state.system[`${pageName}Total`])
    return {
        tableList,
        total
    }
}


export const handleClose = (showFlag) => {
    ElMessageBox.confirm(
        '确保工作保存之后再关闭侧滑?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            showFlag.value = false
        })
}

// 关闭侧滑 清空数据
export const initForm = form => {
    Object.keys(form).forEach(item => {
        form[item] = ''
    })
}

// 编辑
export const useEdit = row => {
    console.log(row)
}