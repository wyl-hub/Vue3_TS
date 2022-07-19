<template>
  <YLTable :tableData="tableList" :total="total" :tableConfig="tableConfig">
    <template #title>
      <div>轮播图列表</div>
    </template>
    <template #headerOpt>
      <el-button @click="showAdd = true" type="primary">添加</el-button>
    </template>
  </YLTable>
  <el-drawer size="50%" title="我是标题" v-model="showAdd" direction="rtl" @open="getSeqList" @closed="refreshList" :before-close="close">
    <swiper-info v-model:showAdd="showAdd" :seqList="seqList" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from '@/store'
import YLTable from '@/baseUi/table'
import { useGetTableList, handleClose } from '@/baseUi/table/hooks'
import { useSeqList } from './hooks'
import { tableConfig } from './formConfig'
import SwiperInfo from './swiperInfo.vue'
export default defineComponent({
  setup() {
    const size = 10
    const pageName = 'swiper'
    const data = { size, offset: 0 }
    const store = useStore()
    const { tableList, total } = useGetTableList(pageName, data)

    const showAdd = ref(false)

    const close = () => handleClose(showAdd)
    // 获取seq下拉列表
    const seqList = ref<number[]>([])
    const getSeqList = () => {
      useSeqList(seqList)
    }

    // 关闭侧滑刷新列表
    const refreshList = () => {
      store.dispatch('system/getPageListAction', { pageName, data })
    }
    return {
      tableList,
      total,
      showAdd,
      tableConfig,
      seqList,
      getSeqList,
      close,
      refreshList
    }
  },
  components: {
    YLTable,
    SwiperInfo
  }
})
</script>

<style scoped>
</style>