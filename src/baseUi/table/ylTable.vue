<template>
    <div class="tableContainer">
        <div class="header">
            <slot name="title">
                <div></div>
            </slot>
            <slot name="headerOpt"></slot>
        </div>
        <el-table :data="tableData" style="width: 100%" border>
            <template v-for="item in tableConfig" :key="item.prop">
                <el-table-column :prop="item.prop" :label="item.label">
                    <template #default="scope">
                        <slot :name="item.prop" :item="scope.row" :index="scope.$index">
                            {{ scope.row[item.prop] }}
                        </slot>
                        <slot v-if="item.prop === 'options'" :name="item.prop" :item="scope.row" :index="scope.$index">
                            <el-button @click="handleEdit(scope.row)" type="primary" plain>编辑</el-button>
                            <el-button @click="handleDelete(scope.row)" type="danger" plain>删除</el-button>
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ITableConfig } from './types'
export default defineComponent({
    props: {
        tableData: {
            type: Array,
            required: true
        },
        tableConfig: {
            type: Array as PropType<ITableConfig[]>,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    emits: ['handleEdit', 'handleDelete'],
    setup(props, { emit }) {
        const handleEdit = row => {
            emit('handleEdit', row)
        }

        const handleDelete = row => {
            emit('handleDelete', row.id)
        }

        return {
            handleEdit,
            handleDelete
        }
    }
})
</script>

<style scoped>
.tableContainer {
    margin-top: 20px;
    background-color: #fff;
}
.header {
    display: flex;
    padding: 5px 10px 0;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
</style>