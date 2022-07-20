<template>
  <YLTable :tableData="tableList" :total="total" :tableConfig="tableConfig" @handleEdit="handleEdit">
    <template #title>
      <div>轮播图列表</div>
    </template>
    <template #headerOpt>
      <el-button @click="showAdd = true" type="primary">添加</el-button>
    </template>
    <template #url="scope">
      <el-image style="height: 100px" :preview-src-list="preimgList" :initial-index="scope.index" :src="scope.item.url" />
    </template>
    <template #createdTime="scope">
      <span>{{ dayjs(scope.item.createdTime).format('YYYY-MM-DD HH:mm') }}</span>
    </template>
    <template #updateTime="scope">
      <span>{{ dayjs(scope.item.updateTime).format('YYYY-MM-DD HH:mm') }}</span>
    </template>
  </YLTable>
  <el-drawer size="50%" title="我是标题" v-model="showAdd" direction="rtl" @open="getSeqList" @closed="refreshList" :before-close="close">
    <swiper-info :infoId="infoId"  v-model:showAdd="showAdd" :seqList="seqList" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import YLTable from '@/baseUi/table'
import dayjs from 'dayjs'
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
    // 图片预览列表
    const preimgList = ref<string[]>([])
    watch(tableList, newVal => {
      newVal.forEach(item => {
        preimgList.value.push(item.url)
      })
    })

    const showAdd = ref(false)
    // 侧滑带入id
    const infoId = ref<number | string>('')
    const close = () => handleClose(showAdd)
    // 获取seq下拉列表
    const seqList = ref<number[]>([])
    const getSeqList = () => {
      useSeqList(seqList)
    }
    // 编辑
    const handleEdit = row => {
      const { id } = row
      infoId.value = id
      showAdd.value = true
    }
    // 关闭侧滑刷新列表
    const refreshList = () => {
      infoId.value = ''
      store.dispatch('system/getPageListAction', { pageName, data })
    }
    return {
      tableList,
      total,
      showAdd,
      tableConfig,
      seqList,
      preimgList,
      dayjs,
      infoId,
      getSeqList,
      close,
      refreshList,
      handleEdit
    }
  },
  components: {
    YLTable,
    SwiperInfo
  }
})
</script>

<style lang="less" scoped>
</style>