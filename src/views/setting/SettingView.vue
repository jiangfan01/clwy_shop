<template>
  <el-form
    :model="setting"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="活动名称" prop="title">
      <el-input v-model="setting.title"></el-input>
    </el-form-item>
    <el-form-item label="站点描述信息" prop="description">
      <el-input v-model="setting.description"></el-input>
    </el-form-item>
    <el-form-item label="ICP备案号" prop="icp">
      <el-input v-model="setting.icp"></el-input>
    </el-form-item>
    <el-form-item
      label="版权信息
"
      prop="copyright"
    >
      <el-input v-model="setting.copyright"></el-input>
    </el-form-item>
    <el-form-item label="站点Logo" prop="logo">
      <el-input v-model="setting.logo"></el-input>
    </el-form-item>
    <el-form-item label="联系地址" prop="address">
      <el-input v-model="setting.address"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="tel">
      <el-input v-model="setting.tel"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即更新</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { fetchSettingList, updateSetting } from "@/api/setting";
export default {
  data() {
    return {
      setting: {
        title: "",
        description: "",
        icp: "",
        copyright: "",
        logo: "",
        address: "",
        tel: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetchSettingList();
      this.setting = res.data.setting;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await updateSetting(this.setting);
          if (res.code !== 20000) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.$router.push({ name: "setting" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
