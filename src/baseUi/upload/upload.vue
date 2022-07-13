<template>
    <div>
        <el-upload action="" class="avatar-uploader" :show-file-list="false" :on-success="uploadSuccess"
            :before-upload="beforeUpload" :http-request="uploadRequest">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
export default defineComponent({
    emit: ['uploadFunction'],
    setup(props, { emit }) {
        // 上传图片临时地址
        const imageUrl = ref('')

        // 上传图片对象
        const file = ref({})

        const uploadSuccess: UploadProps['onSuccess'] = (
            response,
            uploadFile
        ) => {
            imageUrl.value = URL.createObjectURL(uploadFile.raw!)
        }


        // 上传图片格式校验
        const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
            const type = rawFile.type
            const typeList = ['image/jpeg', 'image/jpg', 'image/png']
            if (typeList.indexOf(type) === -1) {
                ElMessage.error('只能上传jpg、jpeg、png格式的图片！')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('图片大小不能大于2MB！')
                return false
            }
            return true
        }

        // 上传图片请求
        const uploadRequest = (options) => {
            file.value = options.file
            // const data = new FormData();
            // data.append('file', options.file)
            options.onSuccess()
            // emit('uploadFunction', data)
        }
        return {
            imageUrl,
            uploadSuccess,
            beforeUpload,
            uploadRequest
        }

    },
    components: {
        Plus
    }
})
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>