<template>
  <div>
    <el-form
      :model="category"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="广告名称" prop="name">
        <el-input v-model="category.name"></el-input>
      </el-form-item>
      <el-form-item label="广告排序" prop="sort">
        <el-input v-model.number="category.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          {{ isEdit ? "立即更新" : "立即创建" }}
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      category: {
        name: "",
        sort: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入广告分类名称", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        sort: [
          { required: true, message: "请选排序", trigger: "change" },
          { type: "number", message: "排序必须为数字值" },
        ],
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
      const res = await request.get(
        `/admin/ad_categories/${this.$route.params.id}`
      );
      this.category = res.data.category;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //验证通过
        let res;
        if (valid) {
          if (this.isEdit) {
            res = await request.put(
              `/admin/ad_categories/${this.$route.params.id}`,
              this.category
            );
          } else {
            res = await request.post("/admin/ad_categories", this.category);
          }
          this.$message.success(res.message);
          this.$router.push({ name: "AdList" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
