<template>
  <div class="nav">
    <div class="logo">
      <img src="~@/assets/imgs/logo.svg" />
      <div>Vue3 Ts</div>
    </div>
    <el-menu
      background-color="#00132b"
      default-active="2"
      text-color="#fff"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <Location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon>
          <Menu />
        </el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon>
          <Document />
        </el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <Setting />
        </el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { Location, Document, Setting, Menu } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
  img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
}

.menu {}
</style>