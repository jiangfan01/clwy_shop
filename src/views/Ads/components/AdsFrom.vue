<template>
  <div>
    <el-form
      :model="ad"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属分类">
        <el-select v-model="ad.categoryId" placeholder="活动区域">
          <el-option
            v-for="category in categories"
            :label="category.name"
            :value="category.id"
            :key="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告标题" prop="title">
        <el-input v-model="ad.title"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="ad.sort"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <el-input v-model="ad.image"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="url">
        <el-input v-model="ad.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          isEdit ? "更新" : "新增"
        }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { fetchAds, categoriesList, updateAds, createAds } from "@/api/ads";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ad: {
        title: "",
        sort: "",
        url: "",
        image: "",
        categoryId: "",
      },
      categories: [],
      rules: {
        title: [
          { required: true, message: "请输入广告标题", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        sort: [{ required: true, message: "请输入广告排序", trigger: "blur" }],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      if (this.isEdit) {
        const res = await fetchAds(this.$route.params.id);
        this.ad = res.data.ad;
      }
      const test = await categoriesList();
      this.categories = test.data.categories;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          if (this.isEdit) {
            res = await updateAds(this.$route.params.id, this.ad);
          } else {
            res = await createAds(this.ad);
          }
          if (res.code !== 20000) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.$router.push({ name: "ads" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
