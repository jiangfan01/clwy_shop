<template>
  <div>
    <router-link :to="{ name: 'create' }">
      <el-button type="primary">新增</el-button>
    </router-link>
    <el-table :data="categories" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column label="排序" width="80">
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.sort"
            @change="handleChange(scope.row.id, scope.row.sort)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ name: 'edit', params: { id: scope.row.id } }">
            <el-button size="mini" @click="handleEdit(scope.row)">
              编辑
            </el-button>
          </router-link>
          <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row)">
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { categoryList, deleteCategory, categorySort } from "@/api/category";

export default {
  data() {
    return { categories: [] };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await categoryList();
      this.categories = res.data.categories;
    },
    handleEdit(row) {
      console.log(row);
    },
    async handleDelete(row) {
      const res = await deleteCategory(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
    async handleChange(id, sort) {
      const res = await categorySort(id, { sort });
      if (res.code !== 20000) {
        this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.init();
    },
  },
};
</script>
