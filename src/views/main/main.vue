<template>
  <div>
    我是Main
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {


    return () => h('div', {class: 'test'}, 'Hello h function')
  }
})
</script>

<style scoped>
.test {
  color: red;
}
</style>