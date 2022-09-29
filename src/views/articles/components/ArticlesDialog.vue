<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form
      :model="article"
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { fetchArticle, createArticle, updateArticle } from "@/api/articles";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  props: ["isEdit"],
  components: {
    quillEditor,
  },
  data() {
    return {
      dialogFormVisible: false,
      editId: "",
      article: {
        title: "",
        body: "",
      },
      editorOption: {
        placeholder: "请填写文章内容",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    async initForm(id) {
      const res = await fetchArticle(id);
      this.editId = id;
      this.article = res.data.article;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 如果验证通过
        if (valid) {
          let res;
          if (this.isEdit) {
            res = await updateArticle(this.editId, this.article);
          } else {
            res = await createArticle(this.article);
          }
          this.dialogFormVisible = false;
          this.$message.success(res.message);
          this.$parent.init();
        }
      });
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      // this.article.body = "";
      this.article = {
        title: "",
        body: "",
      };
    },
  },
};
</script>
