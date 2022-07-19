<template>
    Hello World
    <YLUpload @uploadFunction='uploadFunction' />
</template>

<script lang="ts" >
import { defineComponent, ref } from 'vue'
import YLUpload from '@/baseUi/upload'
import { uploadSingle } from '@/service/upload/index'
export default defineComponent({
    setup() {
        const uploadFunction = (data) => {
            uploadSingle(data).then(res => {
                console.log(res)
            })
        }

        return {
            uploadFunction
        }
    },
    components: {
        YLUpload
    }
})
</script>

<style scoped>
</style>