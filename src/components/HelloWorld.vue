<template>
  <div>Hello World</div>
  <p>{{ msg }}</p>
  <button @click="clickme">sonClick</button>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    msg: Boolean,
    test: Function
  },
  emits: ['ttt'],
  setup(props, ctx) {
    const { msg } = toRefs(props)

    const { test } = props
    const clickme = () => {
        // emit('ttt')
        if (typeof test === 'function') {
          test()
        }
    }
    return {
      msg,
      clickme
    }
  },
  
})
</script>

<style scoped>
</style>