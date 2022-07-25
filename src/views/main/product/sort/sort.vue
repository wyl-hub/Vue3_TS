<template>
  <YLTable :tableData="tableList" :total="total" :tableConfig="tableConfig" @handleEdit="handleEdit"
    @handleDelete="handleDelete" @pageChange="pageChange">
    <template #title>
      <div>种类列表</div>
    </template>
    <template #ifShow="scope">
      <el-tag v-if="scope.item.ifShow === '1'">展示</el-tag>
      <el-tag v-else type="danger">不展示</el-tag>
    </template>
    <template #headerOpt>
      <el-button @click="showAdd = true" type="primary">添加</el-button>
    </template>
  </YLTable>
  <el-drawer size="50%" title="我是标题" v-model="showAdd" direction="rtl" @closed="refreshList" :before-close="close">
    <sort-info ref="sonRef" :infoId="infoId" v-model:showAdd="showAdd" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YLTable from '@/baseUi/table'
import { messageBox } from '@/utils/utils'
import { useStore } from '@/store'
import { tableConfig } from './formConfig'
import { useDelete } from './hooks'
import { useGetTableList, handleClose, initForm } from '@/baseUi/table/hooks'
import SortInfo from './sortInfo.vue'
export default defineComponent({
  setup() {
    const sonRef = ref<InstanceType<typeof SortInfo>>()
    const size = 5
    const pageName = 'sort'
    const data = { size, offset: 0 }
    const showAdd = ref(false)
    const store = useStore()
    const { tableList, total } = useGetTableList(pageName, data)
    const infoId = ref<number | string>('')

    // 加载表格数据
    const loadMainData = () => {
      store.dispatch('system/getPageListAction', { pageName, data })
    }

    // 页码变化
    const pageChange = (cur) => {
      const data = {
        size,
        offset: (cur - 1) * size
      }
      store.dispatch('system/getPageListAction', { pageName, data })
    }

    // 编辑
    const handleEdit = row => {
      const { id } = row
      infoId.value = id
      showAdd.value = true
    }

    const close = () => handleClose(showAdd)
    // 关闭侧滑刷新列表
    const refreshList = () => {
      infoId.value = ''
      loadMainData()
      const form = sonRef.value?.form
      form!.name = ''
      form!.ifShow = false
    }
    const handleDelete = id => {
      messageBox('确定要删除该数据吗？', () => useDelete(id, loadMainData))
    }
    return {
      tableConfig,
      tableList,
      total,
      showAdd,
      infoId,
      sonRef,
      close,
      pageChange,
      refreshList,
      handleEdit,
      handleDelete
    }
  },
  components: {
    YLTable,
    SortInfo
  }
})
</script>

<style scoped>
</style>