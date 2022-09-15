<template>
  <div>
    <el-form
      :model="user"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="原始密码" prop="oldPassword" v-if="isEdit">
        <el-input
          type="password"
          autocomplete="off"
          v-model="user.oldPassword"
        ></el-input>
      </el-form-item>
      <el-form-item :label="isEdit ? '新密码' : '密码'" prop="password">
        <el-input
          type="password"
          v-model="user.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="passwordConfirm">
        <el-input
          type="password"
          autocomplete="off"
          v-model="user.passwordConfirm"
        ></el-input>
      </el-form-item>
      <el-form-item label="管理员">
        <el-switch
          v-model="user.admin"
          active-color="#13ce66"
          inactive-color=""
        >
        </el-switch>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="user.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >{{ isEdit ? "立即修改" : "立即创建" }}
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchUser, updateUser, createUser } from "@/api/user";

export default {
  props: {
    isEdit: { type: Boolean },
  },

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.passwordConfirm !== "") {
          this.$refs.ruleForm.validateField("passwordConfirm");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      user: {
        username: "",
        password: "",
        oldPassword: "",
        passwordConfirm: "",
        admin: false,
        sex: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        passwordConfirm: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.isEdit) {
      this.fetchData();
    }
  },
  methods: {
    //查询单条
    async fetchData() {
      const res = await fetchUser(this.$route.params.id);
      const user = {
        ...res.data.user,
        password: "",
      };
      this.user = user;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          if (this.isEdit) {
            res = await updateUser(this.$route.params.id, this.user);
          } else {
            res = await createUser(this.user);
          }
          if (res.code !== 20000) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.$router.push({ name: "usersList" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
