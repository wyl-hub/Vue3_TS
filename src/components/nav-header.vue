<template>
  <div class="header">
    <el-icon @click="handleFold" class="iconSize"><component :is="isFold ? 'Expand' : 'Fold'" /></el-icon>
  </div>
</template>

<script lang="ts">
import { ref, toRefs } from "vue"
export default {
  emits: ['changeFold'],
  props: {
    isFold: Boolean
  },
  setup (props, { emit }) {
    const { isFold } = toRefs(props)
    const handleFold = () => {
      const data = !isFold.value
      emit('changeFold', data)
    }

    return {
      isFold,
      handleFold
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