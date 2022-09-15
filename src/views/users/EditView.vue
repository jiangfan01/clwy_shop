<template>
  <div>
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
      <el-form-item label="原始密码" prop="oldPassword">
        <el-input v-model="user.oldPassword"></el-input>
      </el-form-item>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input
            type="password"
            v-model="ruleForm.passwordConfirm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-switch
            v-model="ruleForm.admin"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch
        ></el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即更改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>
<script>
import { fetchUser, updateUser } from "@/api/user";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.passwordConfirm) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {},
      ruleForm: {
        password: "",
        passwordConfirm: "",
        oldPassword: "",
        admin: false,
        sex: "0",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        passwordConfirm: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetchUser(this.$route.params.id);
      const user = {
        ...res.data.user,
        oldPassword: "",
      };
      this.user = user;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await updateUser(this.$route.params.id, this.user);
          if (res.code !== 20000) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.$router.push({ name: "userList" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
