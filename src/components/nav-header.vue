<template>
  <div class="header">
    <el-icon @click="changeFold" class="iconSize"><component :is="isFold ? 'Fold' : 'Expand'" /></el-icon>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup () {
    const isFold = ref(false)

    // 点击折叠按钮
    const changeFold = () => {
      isFold.value = !isFold.value
    }
    return {
      isFold,
      changeFold
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  box-sizing: border-box;
}
.iconSize {
  cursor: pointer;
  margin-top: 10px;
  font-size: 30px;
}
</style>