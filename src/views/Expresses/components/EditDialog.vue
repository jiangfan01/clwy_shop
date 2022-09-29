<template>
  <div>
    <el-dialog title="新增物流信息" :visible.sync="dialogFormVisible">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchExpresses, updateExpress } from "@/api/experss";

export default {
  data() {
    return {
      dialogFormVisible: false,
      express: {
        name: "",
        code: "",
        url: "",
        sort: "",
      },
      editId: "",
      formLabelWidth: "120px",
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
  methods: {
    async initEdit(id) {
      const res = await fetchExpresses(id);
      this.editId = id;
      this.express = res.data.express;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 如果验证通过
        if (valid) {
          const res = await updateExpress(this.editId, this.express);
          this.dialogFormVisible = false;
          this.$message.success(res.message);
          this.$parent.init();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
