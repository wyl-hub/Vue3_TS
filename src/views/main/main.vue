<template>
  <el-container class="container">
    <el-aside :style="{width: isFold ? 'fit-content' : '210px'}" class="aside">
      <nav-menu :menuList="menuList" :isFold="isFold" @getBreadPath="getBreadPath" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <nav-header :isFold="isFold" @changeFold='changeFold' />
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import NavMenu from '@/components/nav-menu.vue'
import NavHeader from '@/components/nav-header.vue'
export default defineComponent({
  setup() {
    // main 组件首次渲染 使用token去获取userInfo 和 menuList
    // 因为路由守卫已经判断缓存中是否存在token 请求头中会自己动带入token
    const store = useStore()
    store.dispatch('login/getDetailByToken')
    
    const menuList = computed(() => store.state.login.userMenu)
    const isFold = ref(false)

    // 点击折叠按钮
    const changeFold = (data: boolean) => {
      isFold.value = data
    }
    // 获取面包屑路径
    const getBreadPath = (data: string[]) => {
        store.dispatch('getBreadcrumbPath', { data })
    }
    return {
      isFold,
      menuList,
      changeFold,
      getBreadPath
    }
  },
  components: {
    NavMenu,
    NavHeader
  }
})
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .aside {
    background-color: #00152B;
    color: white;
  }
  .header {
    height: 50px;
    background-color: #fff;
  }
  .main {
    background-color: #F2F2F6;
  }
}
</style>