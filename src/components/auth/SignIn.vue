<template>
  <div class="sign-in">
    <el-row>
      <el-col :span="12" :offset="6">
        <h1>长乐未央后台</h1>
        <el-form
          :model="user"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="sort">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="记住我" prop="remember">
            <el-checkbox v-model="user.remember" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              立即登录
            </el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { SignIn } from "@/api/auth";
import { setToken } from "@/utils/auth";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        remember: false,
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          SignIn(this.user).then((res) => {
            if (this.user.remember) {
              setToken(res.data.token, true);
            } else {
              setToken(res.data.token);
            }
            location.reload();
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped lang="scss">
.sign-in {
  padding-top: 100px;
}

h1 {
  text-align: center;
}
</style>
