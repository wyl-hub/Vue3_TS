<template>
  <div class="nav">
    <div class="logo">
      <img src="~@/assets/imgs/logo.svg" />
      <div v-if="!isFold">Vue3 Ts</div>
    </div>
    <el-menu
      default-active="2"
      class="menu"
      :collapse="isFold"
      collapse-transition
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="(item, index) in menuList" :key="index">
        <!-- 一级 有子集 菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="index + ''">
            <template #title>
              <el-icon>
                <component v-if="item.icon" :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="(subItem, subIndex) in item.children" :key="subIndex">
              <!-- 二级 有子集 -->
              <template v-if="subItem.type === 1">
                <el-sub-menu :index="index + '-' + subIndex">
                  <template #title>
                    <el-icon>
                      <component v-if="subItem.icon" :is="subItem.icon" />
                    </el-icon>
                    <span>{{ subItem.title }}</span>
                  </template>
                  <!-- 三级菜单 默认都是type 2 -->
                  <template v-for="(lastItem, lastIndex) in subItem.children" :key="lastIndex" >
                    <el-menu-item :index="index + '-' + subIndex + '-' + lastIndex" @click="clickMenu(lastItem)">
                      <el-icon>
                        <component v-if="lastItem.icon" :is="lastItem.icon" />
                      </el-icon>
                      <span>{{ lastItem.title }}</span>
                    </el-menu-item>
                  </template>
                </el-sub-menu>
              </template>
              <!-- 二级 无子集 -->
              <template v-if="subItem.type === 2">
                <el-menu-item :index="index + '-' + subIndex" @click="clickMenu(subItem)">
                  <el-icon>
                    <component v-if="subItem.icon" :is="subItem.icon" />
                  </el-icon>
                  <span>{{ subItem.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级 无子集 -->
        <template v-if="item.type === 2">
          <el-menu-item :index="index + ''" @click="clickMenu(item)">
            <el-icon>
              <component v-if="item.icon" :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import type { IMenuItem } from '@/service/login/types'
import { useRouter } from 'vue-router';
const props = defineProps<{
  isFold: boolean,
  menuList: IMenuItem[]
}>()
const router = useRouter()
const clickMenu = (item: IMenuItem) => {
  if (item.url) router.push(item.url)
}
</script>

<style lang="less" scoped>
.nav {
  box-sizing: border-box;
  .menu {
    border-right: none !important;
  }
}
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

</style>