import type { IFormConfig } from '@/baseUi/searchHeader'

export const formConfig: IFormConfig[] = [
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

export const tableConfig = [
    {
        prop: 'name',
        label: '用户名',
        minWidth: ''
    },
    {
        prop: 'phone',
        label: '手机号码',
        minWidth: ''
    },
    {
        prop: 'createdTime',
        label: '创建时间',
        minWidth: ''
    },
    {
        prop: 'updateTime',
        label: '更新时间',
        minWidth: ''
    },
    {
        prop: 'options',
        label: '操作'
    }
]