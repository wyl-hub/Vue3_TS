<template>
  <YLForm :formConfig="formConfig" v-model="formData">
    <template #footer>
      <el-button @click="reset(formData, initData)" type="success">重置</el-button>
      <el-button type="primary">查询</el-button>
    </template>
  </YLForm>
  <h2>用户设置</h2>
  <h2>{{ formData.name }}</h2>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { reset } from '@/baseUi/searchHeader/formHooks'
import YLForm from '@/baseUi/searchHeader'
import formConfig from './formConfig'
export default defineComponent({
  setup() {
    const store = useStore()
    console.log('store', store)
    store.dispatch('system/getPageListAction')
    const initData = {
      name: '',
      gender: '',
      createdTime: ''
    }
    const formData = ref({ ...initData })

    return {
      formConfig,
      initData,
      formData,
      reset
    }
  },
  components: {
    YLForm
  }
})
</script>

<style scoped>
</style>