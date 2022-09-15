<template>
  <div>
    <router-link :to="{ name: 'createExpresses' }">
      <el-button type="primary" round>新增物流系信息</el-button>
    </router-link>
    <el-table :data="expresses" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="code" label="物流公司编码" width="180">
      </el-table-column>
      <el-table-column prop="url" label="网址" width="180"> </el-table-column>
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
          <router-link
            :to="{ name: 'editExpresses', params: { id: scope.row.id } }"
          >
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
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  fetchExpressesList,
  deleteExpresses,
  sortExpresses,
} from "@/api/experss";
export default {
  data() {
    return {
      expresses: [],
      searchParams: { currentPage: 1, pageSize: 10 },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetchExpressesList(this.searchParams);
      this.expresses = res.data.expresses;
      this.pagination = res.data.pagination;
    },
    handleEdit(row) {
      console.log(row);
    },
    async handleDelete(row) {
      const res = await deleteExpresses(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.init();
    },
    async handleChange(id, sort) {
      const res = await sortExpresses(id, { sort });
      if (res.code !== 20000) {
        this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.init();
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val;
      this.init();
    },
  },
};
</script>
<style>
.block {
  margin-top: 30px;
}
</style>
