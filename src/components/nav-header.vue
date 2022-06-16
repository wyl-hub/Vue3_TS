<template>
  <div class="headerContainer">
    <!-- left fold bread -->
    <div class="header">
      <el-icon @click="handleFold" class="iconSize">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <!-- 面包屑 -->
    <div class="breadContainer">
      我是面包屑
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, defineComponent } from "vue"
export default defineComponent({
  emits: ['changeFold'],
  props: {
    isFold: Boolean
  },
  setup(props, { emit }) {
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
})
</script>

<style lang="less" scoped>
.headerContainer {
  display: flex;
  align-items: center;

  .header {
    box-sizing: border-box;

    .iconSize {
      cursor: pointer;
      margin-top: 10px;
      font-size: 30px;
    }
  }
  .breadContainer {
    margin-left: 20px;
  }

}
</style>