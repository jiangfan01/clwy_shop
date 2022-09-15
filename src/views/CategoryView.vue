<template>
  <el-table :data="category" style="width: 100%">
    <el-table-column prop="id" label="商品编号" width="180"> </el-table-column>
    <el-table-column prop="name" label="分类名称" width="180">
    </el-table-column>
  </el-table>
</template>
<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      category: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await request.get(`/admin/categories`);
      this.category = res.data.categories;
    },
  },
};
</script>
<style>
.el-table__body {
  width: 100% !important;
}
.el-table__header {
  width: 100% !important;
}
</style>
