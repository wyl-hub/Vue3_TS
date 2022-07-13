<template>
  <YLForm :formConfig="formConfig" v-model="formData">
    <template #footer>
      <el-button @click="reset(formData, initData)" type="success">重置</el-button>
      <el-button type="primary">查询</el-button>
    </template>
  </YLForm>
  <YLTable :tableData="userList" :total="total" :tableConfig="tableConfig">
    <template #header>
      <el-button @click="showAdd = true" type="primary">添加</el-button>
    </template>
    <template #name="scope">
      {{ scope.item.name }}
    </template>
  </YLTable>
  <!-- 添加页面 -->
  <el-drawer size="50%" title="我是标题" v-model="showAdd" direction="rtl" :before-close="close">
    <SwiperInfo />
  </el-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue'
import { useStore } from '@/store'
import { reset } from '@/baseUi/searchHeader/formHooks'
import { handleClose } from '@/baseUi/table/hooks'
import YLForm from '@/baseUi/searchHeader'
import YLTable from '@/baseUi/table'
import SwiperInfo from './swiperInfo.vue'
import { formConfig, tableConfig } from './formConfig'
export default defineComponent({
  setup() {
    const store = useStore()
    // 请求table数据
    store.dispatch('system/getPageListAction', { data: { size: 10, offset: 0 } })
    const userList = computed(() => store.state.system.userList)
    const total = computed(() => store.state.system.total)
    const initData = {
      name: '',
      gender: '',
      createdTime: ''
    }
    const formData = ref({ ...initData })

    // 是否展开添加侧滑
    const showAdd = ref(false)
    // 关闭侧滑校验
    const close = () => handleClose(showAdd)
    return {
      formConfig,
      tableConfig,
      initData,
      formData,
      userList,
      total,
      showAdd,
      reset,
      close
    }
  },
  components: {
    YLForm,
    YLTable,
    SwiperInfo
  }
})
</script>

<style scoped>
</style>