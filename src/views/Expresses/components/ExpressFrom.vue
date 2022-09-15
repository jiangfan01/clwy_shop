<template>
  <div>
    <el-form
      :model="express"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="物流名称" prop="name">
        <el-input v-model="express.name"></el-input>
      </el-form-item>
      <el-form-item label="物流编码" prop="code">
        <el-input v-model="express.code"></el-input>
      </el-form-item>
      <el-form-item label="网址" prop="url">
        <el-input v-model="express.url"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="express.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          isEdit ? "立即更新" : "立即创建"
        }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  updateExpress,
  fetchExpressesList,
  createExpresses,
} from "@/api/experss";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      express: {
        name: "",
        code: "",
        url: "",
        sort: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入物流名称", trigger: "blur" },
          {
            min: 3,
            max: 14,
            message: "长度在 3 到 14个字符",
            trigger: "blur",
          },
        ],
        sort: [
          { required: true, message: "请输入排序", trigger: "blur" },
          { type: "number", message: "排序必须为数字值" },
        ],
        code: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.isEdit) {
      this.init();
    }
  },
  methods: {
    async init() {
      const res = await fetchExpressesList(this.$route.params.id);
      this.express = res.data.express;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        let res;
        if (valid) {
          if (this.isEdit) {
            res = await updateExpress(this.$route.params.id, this.express);
          } else {
            res = await createExpresses(this.express);
          }
          if (res.code !== 20000) {
            this.$message.error(res.message);
          }
          this.$message.success(res.message);
          this.$router.push({ name: "expresses" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
