<template>
    <div class="searchContainer">
        <h2>{{ formData.name }}</h2>
        <el-form>
            <el-row :gutter="20">
                <el-col v-for="(item, index) in formConfig" :key="index" :span="8">
                    <el-form-item :label="item.title">
                        <el-input v-if="item.type === 'input'" v-model="formData[item.field]" />
                        <el-date-picker v-if="item.type === 'datePicker'" style="width: 100%"
                            v-model="formData[item.field]" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="submit_btn">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import type { IFormConfig } from './types'
export default defineComponent({
    props: {
        formConfig: {
            type: Array as PropType<IFormConfig[]>,
            required: true
        },
        modelValue: {
            type: Object,
            required: true
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        let formData = ref({ ...props.modelValue })
        watch(formData, newVal => emit("update:modelValue", newVal), { deep: true })
        return {
            formConfig: props.formConfig,
            formData
        }
    }
})
</script>

<style lang="less" scoped>
.searchContainer {
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
}

.submit_btn {
    text-align: end;
}
</style>