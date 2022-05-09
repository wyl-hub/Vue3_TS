<template>
  <el-container class="container">
    <el-aside class="aside">
      <nav-menu></nav-menu>
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavMenu from '@/components/nav-menu.vue'
export default defineComponent({
  setup() {


  },
  components: {
    NavMenu
  }
})
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .aside {
    width: 210px;
    background-color: #00152B;
    color: white;
  }
  .header {
    height: 80px;
    background-color: #fff;
  }
  .main {
    background-color: #F2F2F6;
  }
}
</style>