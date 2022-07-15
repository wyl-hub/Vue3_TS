<template>
  <YLTable :tableData="tableList" :total="total" :tableConfig="tableConfig">
    <template #header>
      <el-button @click="showAdd = true" type="primary">添加</el-button>
    </template>
  </YLTable>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YLTable from '@/baseUi/table'
import { useGetTableList } from '@/baseUi/table/hooks'
import { tableConfig } from './formConfig'

export default defineComponent({
  setup() {
    const size = 10
    const { tableList, total } = useGetTableList('swiper', { size, offset: 0 })
    console.log(tableList)
    console.log(total)
    const showAdd = ref(false)
    return {
      tableList,
      total,
      showAdd,
      tableConfig
    }
  },
  components: {
    YLTable
  }
})
</script>

<style scoped>
</style>