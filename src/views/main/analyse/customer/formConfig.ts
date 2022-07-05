import type { IFormConfig } from '@/baseUi/searchHeader'

const formConfig: IFormConfig[] = [
    {
        field: 'name',
        title: '用户名',
        type: 'input'
    },
    {
        field: 'gender',
        title: '性别',
        type: 'input'
    },
    {
        field: 'createdTime',
        title: '创建时间',
        type: 'datePicker'
    }
]

export default formConfig