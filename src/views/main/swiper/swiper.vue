<template>
  <YLTable :tableData="tableList" :total="total" :tableConfig="tableConfig" @handleEdit="handleEdit"
    @handleDelete="handleDelete" @pageChange="pageChange">
    <template #title>
      <div>轮播图列表</div>
    </template>
    <template #headerOpt>
      <el-button @click="showAdd = true" type="primary">添加</el-button>
    </template>
    <template #url="scope">
      <el-image style="height: 100px" :preview-src-list="preimgList" :initial-index="scope.index"
        :src="scope.item.url" />
    </template>
  </YLTable>
  <el-drawer size="50%" title="我是标题" v-model="showAdd" direction="rtl" @open="getSeqList" @closed="refreshList"
    :before-close="close">
    <swiper-info ref="sonRef" :infoId="infoId" v-model:showAdd="showAdd" :seqList="seqList" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { messageBox } from '@/utils/utils'
import { useStore } from '@/store'
import YLTable from '@/baseUi/table'
import dayjs from 'dayjs'
import { useGetTableList, handleClose, initForm } from '@/baseUi/table/hooks'
import { useSeqList, useDeleteSwiper } from './hooks'
import { tableConfig } from './formConfig'
import SwiperInfo from './swiperInfo.vue'
export default defineComponent({
  setup() {
    const sonRef = ref<InstanceType<typeof SwiperInfo>>()
    const size = 5
    const pageName = 'swiper'
    const data = { size, offset: 0 }
    const store = useStore()
    const { tableList, total } = useGetTableList(pageName, data)
    // 图片预览列表
    const preimgList = ref<string[]>([])
    watch(tableList, newVal => {
      preimgList.value = []
      newVal.forEach(item => {
        preimgList.value.push(item.url)
      })
    }, { deep: true })

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

    // 关闭侧滑刷新列表
    const refreshList = () => {
      infoId.value = ''
      loadMainData()
      // 清空详情表单
      const form = sonRef.value?.form
      form!.name = ''
      form!.seq = ''
      sonRef.value!.fileList.pop()
    }

    const handleDelete = id => {
      messageBox('确定要删除该数据吗？', () => useDeleteSwiper(id, loadMainData))
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
      sonRef,
      getSeqList,
      close,
      initForm,
      refreshList,
      handleEdit,
      handleDelete,
      pageChange
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