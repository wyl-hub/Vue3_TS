<template>
    <div class="infoPage">
        <el-form :model="form" :rules="rules" ref="formDom" label-position="right" label-width="70px"
            class="login-form">
            <el-form-item required prop="name" label="名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item prop="ifShow" label="是否展示">
                <el-switch v-model="form.ifShow" />
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="submit" type="primary">保存</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, effect } from 'vue'
import { useSaveForm, useSortInfo } from './hooks'
import type { FormInstance, FormRules } from 'element-plus'

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
        }
    },
    emits: ['update:showAdd'],
    setup(props, { emit }) {
        const formDom = ref<FormInstance>()
        const form = reactive({
            name: '',
            ifShow: false,
        })


        // 如果是详情进来 请求详情数据
        effect(() => {
            const id = props.infoId
            if (!id) return
            useSortInfo(id as number, form)
        })

        const rules = reactive<FormRules>({
            name: [
                { required: true, message: '名称不能为空', trigger: 'blur' },
                { max: 10, message: '标题不能超过10个字符', trigger: 'blur' }
            ],
            url: [
                { required: true, message: '图片不能为空', trigger: 'blur' }
            ]
        })

        const submit = () => {
            if (!formDom.value) return
            formDom.value?.validate((valid) => {
                if (!valid) return
                const data = {
                    id: props.infoId,
                    ...form
                }
                useSaveForm(data, emit)
            })
        }

        return {
            form,
            rules,
            formDom,
            submit
        }
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