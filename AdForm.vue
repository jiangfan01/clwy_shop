<template>
  <div>
    <el-form
      :model="ad"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="ad.categoryId" placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告标题" prop="title">
        <el-input v-model="ad.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <!-- action 上传到七牛 -->
        <!-- show-file-list 是否显示上传队列-->
        <!-- on-success 上传成功后，将返回的文件名赋值个表单 -->
        <!-- before-upload 上传之前，这里可以生成token和key-->
        <!-- data，上传所需的额外参数，可以带上token和key-->
        <!-- name，上传的name名，默认是file，要看接口的要求-->
        <el-upload
          class="image-uploader"
          action="http://upload.qiniup.com/"
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
      <el-form-item label="网址" prop="url">
        <el-input v-model="ad.url"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="ad.sort"></el-input>
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
import { fetchToken } from "@/api/uploads";
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
      // 上传所需要的token和文件名参数
      uploadData: {
        token: "",
        key: "",
      },
      // 用来显示预览图片的
      imageUrl: "",
      categories: [],
      ad: {
        title: "",
        categoryId: "",
        image: "",
        sort: "",
        url: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入广告分类名称", trigger: "blur" },
          {
            min: 2,
            max: 45,
            message: "长度在 2 到 45 个字符",
            trigger: "blur",
          },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
    };
  },
  created() {
    this.init();
    if (this.isEdit) this.initEdit();
  },
  methods: {
    async init() {
      const res = await request.get("/admin/ad_categories");
      this.categories = res.data.categories;
    },
    async initEdit() {
      const res = await request.get(`/admin/ads/${this.$route.params.id}`);
      this.ad = res.data.ad;
      this.imageUrl = res.data.ad.image;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 如果验证通过
        if (valid) {
          let res;
          if (this.isEdit) {
            res = await request.put(
              `/admin/ads/${this.$route.params.id}`,
              this.ad
            );
          } else {
            res = await request.post("/admin/ads", this.ad);
          }

          if (res.code !== 20000) {
            this.$message.error(res.message);
            return;
          }

          this.$message.success(res.message);
          this.$router.push({ name: "adsList" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传成功后
    handleImageSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ad.image = `http://oss.shop.clwy.cn/${res.key}`;
    },
    // 上传之前，先做数据验证。
    // 通过验证后，生成token和文件名，并赋值给上传组件，这样上传的时候会自动提交相关参数。
    async beforeImageUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
        return false;
      }

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      const res = await fetchToken();
      this.uploadData.token = res.data.uploadToken;

      // 通过uui的生成新文件名，并拼接扩展名
      const ext = file.type.split("/")[1];
      this.uploadData.key = `${uuidv4()}.${ext}`;
    },
  },
};
</script>
