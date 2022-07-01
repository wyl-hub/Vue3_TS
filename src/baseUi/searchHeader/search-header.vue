<template>
    <div class="searchContainer">
        <el-form>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="用户名">
                        <el-input />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别">
                        <el-input />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="创建时间">
                        <el-date-picker key="datePicker01" style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {


        return {}
    }
})
</script>

<style lang="less" scoped>
.searchContainer {
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
}
</style>