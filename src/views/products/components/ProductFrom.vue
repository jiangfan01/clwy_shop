<template>
  <div>
    <el-form
      :model="product"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="属性分类">
        <el-select v-model="product.categoryId" placeholder="请选择">
          <el-option-group
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
          >
            <el-option
              v-for="item in category.children"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="product.name"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
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
      <el-form-item label="单价" prop="price">
        <el-input v-model.number="product.price"></el-input>
      </el-form-item>
      <el-form-item label="上架">
        <el-switch
          v-model="product.sale"
          active-color="#13ce66"
          inactive-color=""
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="推荐">
        <el-switch
          v-model="product.recommend"
          active-color="#13ce66"
          inactive-color=""
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="置顶">
        <el-switch
          v-model="product.top"
          active-color="#13ce66"
          inactive-color=""
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="新品">
        <el-switch
          v-model="product.new"
          active-color="#13ce66"
          inactive-color=""
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="热门">
        <el-switch
          v-model="product.hot"
          active-color="#13ce66"
          inactive-color=""
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="内容" prop="title">
        <quill-editor
          ref="myQuillEditor"
          v-model="product.body"
          :options="editorOption"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          isEdit ? "编辑" : "创建"
        }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ShopList } from "@/api/shop";
import { fetchProducts, updateProducts, createProducts } from "@/api/products";
import { fetchToken } from "@/api/upload";
import { v4 as uuidv4 } from "uuid";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  props: {
    isEdit: { type: Boolean, default: false },
  },
  data() {
    return {
      categories: [],
      product: {},
      uploadData: {
        token: "",
        key: "",
      },
      imageUrl: "",
      editorOption: {
        placeholder: "请输入文章内容",
      },
      searchParams: { name: "", categoryId: "" },
    };
  },
  created() {
    if (this.isEdit) this.init();
    this.test();
  },
  methods: {
    async init() {
      if (this.isEdit) {
        const res = await fetchProducts(this.$route.params.id);
        this.imageUrl = res.data.product.image;
        this.product = res.data.product;
      }
    },
    async test() {
      const test = await ShopList();
      this.categories = test.data.categories;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          if (this.isEdit) {
            res = await updateProducts(this.$route.params.id, this.product);
          } else {
            res = await createProducts(this.product);
          }
          if (res.code !== 20000) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.$router.push({ name: "productsList" });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleImageSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.product.image = `http://ria894its.hn-bkt.clouddn.com/${res.key}`;
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
  },
};
</script>
