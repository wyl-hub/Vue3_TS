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
                <el-table-column :prop="item.prop" :sortable="item.sortable ? true : false" :label="item.label">
                    <template #default="scope">

                        <slot v-if="item.prop === 'createdTime' || item.prop === 'updateTime'" :name="item.prop"
                            :item="scope.row" :index="scope.$index">
                            <span>{{ dayjs(scope.row[item.prop]).format('YYYY-MM-DD HH:mm') }}</span>
                        </slot>
                        <slot v-else-if="item.prop === 'options'" :name="item.prop" :item="scope.row"
                            :index="scope.$index">
                            <el-button @click="handleEdit(scope.row)" type="primary" plain>编辑</el-button>
                            <el-button @click="handleDelete(scope.row)" type="danger" plain>删除</el-button>
                        </slot>
                        <slot v-else :name="item.prop" :item="scope.row" :index="scope.$index">
                            {{ scope.row[item.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" :page-size="5" :total="total"
            @current-change="pageChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ITableConfig } from './types'
import dayjs from 'dayjs'
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
    emits: ['handleEdit', 'handleDelete', 'pageChange'],
    setup(props, { emit }) {
        const handleEdit = row => {
            emit('handleEdit', row)
        }

        const handleDelete = row => {
            emit('handleDelete', row.id)
        }

        const pageChange = cur => {
            emit('pageChange', cur)
        }

        return {
            dayjs,
            handleEdit,
            handleDelete,
            pageChange
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

.pagination {
    margin-top: 30px;
    justify-content: flex-end;
}
</style>