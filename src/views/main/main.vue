<template>
  <el-container class="container">
    <el-aside class="aside">
      <nav-menu></nav-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <nav-header></nav-header>
      </el-header>
      <el-main class="main">
        <ul>
          <li v-for="item in arr">
            {{ item === 'aaa' ? 'a' : 'b'}}
          </li>
        </ul>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavMenu from '@/components/nav-menu.vue'
import NavHeader from '@/components/nav-header.vue'
export default defineComponent({
  setup() {
    const arr = ['test', 'aaa', 'vvv']
    return {
      arr
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