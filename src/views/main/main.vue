<template>
  <el-container class="container">
    <el-aside :style="{width: isFold ? 'fit-content' : '210px'}" class="aside">
      <nav-menu :isFold="isFold" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <nav-header :isFold="isFold" @changeFold='changeFold' />
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
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu.vue'
import NavHeader from '@/components/nav-header.vue'
export default defineComponent({
  setup() {
    const arr = ['test', 'aaa', 'vvv']
    const isFold = ref(false)

    // 点击折叠按钮
    const changeFold = (data: boolean) => {
      isFold.value = data
    }
    return {
      arr,
      isFold,
      changeFold
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
    height: 80px;
    background-color: #fff;
  }
  .main {
    background-color: #F2F2F6;
  }
}
</style>