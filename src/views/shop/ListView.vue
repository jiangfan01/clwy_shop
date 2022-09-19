<template>
  <div>
    <router-link :to="{ name: 'shopCreate' }">
      <el-button type="primary" round>新增</el-button>
    </router-link>
    <el-table
      :data="categories"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
    >
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" v-if="scope.row.parentId !== 0" />
        </template>
      </el-table-column>
      <el-table-column label="排序" width="180">
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.sort"
            @change="handleChange(scope.row.id, scope.row.sort)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.createdAt | dateFormat }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ name: 'shopEdit', params: { id: scope.row.id } }">
            <el-button size="mini">编辑</el-button>
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
import { ShopList, SortShop, deleteShop } from "@/api/shop";

export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await ShopList();
      this.categories = res.data.categories;
    },
    async handleChange(id, sort) {
      const res = await SortShop(id, { sort });
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
    async handleDelete(row) {
      const res = await deleteShop(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
  },
};
</script>
<style scoped>
.el-input {
  max-width: 50px;
}
</style>
