<template>
    <div class="infoPage">
        <el-form :model="form" :rules="rules" ref="formDom" label-position="right" label-width="70px" class="login-form">
            <el-form-item required prop="name" label="标题">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item prop="seq" label="顺序号">
                <el-select v-model="form.seq">
                    <el-option v-for="item in seqList" :key="item" :value="item" :label="item" />
                </el-select>
            </el-form-item>
            <el-form-item required prop="url" label="图片">
                <YLUpload :fileList="fileList" @uploadFunction='uploadFunction' />
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="submit" type="primary">保存</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType, effect } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useSaveForm } from './hooks'
import type { IFile } from '@/baseUi/upload/types'
import { uploadSingle } from '@/service/upload/index'
import YLUpload from '@/baseUi/upload'

export default defineComponent({
    props: {
        infoId: {
            type: [Number, String],
            default: '',
            required: true
        },
        showAdd: {
            type: Boolean,
            required: true
        },
        seqList: {
            type: Array as PropType<number[]>,
            required: true
        }
    },
    emits: ['update:showAdd'],
    setup(props, { emit }) {
        const formDom = ref<FormInstance>()
        const form = reactive({
            name: '',
            seq: '',
            url: ''
        })
       
       effect(() => {
            const id = props.infoId
            if (!id) return
            console.log(id)
       })

        // 图片列表
        const fileList = ref<IFile[]>([])
        watch(() => fileList, newVal => {
            if (newVal.value.length > 0) {
                form.url = newVal.value[0].url
            } else {
                form.url = ''
            }
        }, { deep: true })
        const rules = reactive<FormRules>({
            name: [
                { required: true, message: '标题不能为空', trigger: 'blur' },
                { max: 20, message: '标题不能超过20个字符', trigger: 'blur' }
            ],
            url: [
                { required: true, message: '图片不能为空', trigger: 'blur' }
            ]
        })

        const uploadFunction = (data) => {
            uploadSingle(data).then(res => {
                if (fileList.value.length > 0) {
                    fileList.value[0] = res
                } else {
                    fileList.value.push(res)
                }
            })
        }

        const submit = () => {
            if (!formDom.value) return
            formDom.value?.validate((valid) => {
                if (!valid) return
                useSaveForm(form, emit)
            })
        }

        return {
            form,
            rules,
            formDom,
            fileList,
            uploadFunction,
            submit
        }
    },
    components: {
        YLUpload
    }
})
</script>

<style scoped>
.infoPage {
    overflow-x: hidden;
}
.footer {
    margin-top: 50px;
    text-align: right;
    padding-right: 50px;
}
</style>