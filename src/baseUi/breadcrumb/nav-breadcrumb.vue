<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadPath" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
    setup() {
        const store = useStore()
        const breadPath = computed(() => store.state.breadPath)

        return {
            breadPath
        }
    }
})
</script>

<style scoped>
</style>