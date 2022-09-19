<template>
  <el-form
    :model="category"
    :rules="rules"
    ref="ruleForm"
    class="demo-ruleForm"
    label-width="100px"
  >
    <el-form-item label="上级分类">
      <el-select v-model="category.parentId" placeholder="活动区域">
        <el-option label="默认" :value="0"></el-option>
        <el-option
          v-for="category in categories"
          :label="category.name"
          :value="category.id"
          :key="category.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="category.name"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model.number="category.sort"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="image" v-if="category.parentId !== 0">
      <el-upload
        class="image-uploader"
        action="http://up-z2.qiniup.com/"
        :show-file-list="false"
        :on-success="handleImageSuccess"
        :before-upload="beforeImageUpload"
        :data="uploadData"
        name="file"
      >
        <img v-if="imageUrl" :src="imageUrl" class="image" />
        <i v-else class="el-icon-plus image-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{
        isEdit ? "编辑" : "创建"
      }}</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { ShopFetch, updateShop, createShop, ShopList } from "@/api/shop";
import { fetchToken } from "@/api/upload";
import { v4 as uuidv4 } from "uuid";
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
      uploadData: {
        token: "",
        key: "",
      },
      imageUrl: "",
      categories: [],
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入排序",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.init(this.isEdit);
    this.shopList();
  },
  methods: {
    async init() {
      if (this.isEdit) {
        const res = await ShopFetch(this.$route.params.id);
        this.category = res.data.category;
        this.imageUrl = res.data.category.image;
      }
    },
    async shopList() {
      const res = await ShopList();
      this.categories = res.data.categories;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          if (this.isEdit) {
            res = await updateShop(this.$route.params.id, this.category);
          } else {
            res = await createShop(this.category);
          }
          if (res.code !== 20000) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.$router.push({ name: "shopList" });
        }
      });
    },
    handleImageSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.category.image = `http://ria894its.hn-bkt.clouddn.com/${res.key}`;
    },
    async beforeImageUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传头像图片只能是 JPG,PNG,GIF 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }

      const res = await fetchToken();
      this.uploadData.token = res.data.uploadToken;

      const ext = file.type.split("/")[1];
      this.uploadData.key = `${uuidv4()}.${ext}`;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
