<template>
  <div class="login">
    <div class="login-box">
      <h2>后台管理系统</h2>
      <el-form ref="formDom" :model="form" :rules="rules" label-position="right" label-width="70px" class="login-form">
        <el-form-item prop="name" label="用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" @keydown.enter="login" show-password v-model="form.password" />
        </el-form-item>
      </el-form>
      <el-button class="login-btn" @click="login" type="primary">登陆</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from "vue-router"
import { useStore } from 'vuex'
import type { FormInstance, FormRules } from 'element-plus'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    // 表单节点
    const formDom = ref<FormInstance>()
    // 登陆表单
    const form = reactive({
      name: '',
      password: ''
    })

    // 表单校验规则
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
      ]
    })

    // 登陆
    const login = () => {
      if (!formDom.value) return
      formDom.value?.validate(valid => {
        if (!valid) return
        store.dispatch('login/accountLoginAction', { data: { ...form }, router })
      })
    }


    return {
      form,
      rules,
      formDom,
      login
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  background: url('~@/assets/imgs/login-bg-5.jpg');
  background-size: 100% 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;

  .login-box {
    position: absolute;
    box-sizing: border-box;
    padding: 50px;
    border-radius: 20px;
    width: 400px;
    height: 300px;
    background-color: #fff;
    margin: auto;
    top: calc(50% - 230px);
    left: calc(50% - 200px);

    h2 {
      margin: 0;
    }

    .login-form {
      margin-top: 30px;
    }

    .login-btn {
      margin-top: 10px;
      width: 100%;
      height: 40px;
    }
  }
}
</style>