<template>
  <div>
    <el-form
      :model="article"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="title">
        <quill-editor
          ref="myQuillEditor"
          v-model="article.body"
          :options="editorOption"
        />
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
import { updateArticle, createArticle, fetchArticle } from "@/api/articles";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    quillEditor,
  },
  data() {
    return {
      article: {
        title: "",
        body: "",
      },
      editorOption: {
        placeholder: "请填写文章内容",
      },
      rules: {
        title: [
          { required: true, message: "请输入物流名称", trigger: "blur" },
          {
            min: 3,
            max: 14,
            message: "长度在 3 到 14个字符",
            trigger: "blur",
          },
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
      const res = await fetchArticle(this.$route.params.id);
      this.article = res.data.article;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        let res;
        if (valid) {
          if (this.isEdit) {
            res = await updateArticle(this.$route.params.id, this.article);
          } else {
            res = await createArticle(this.article);
          }
          if (res.code !== 20000) {
            this.$message.error(res.message);
          }
          this.$message.success(res.message);
          this.$router.push({ name: "articlesList" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.ql-editor {
  min-height: 200px !important;
}
</style>
