<template>
  <div>
    <el-popconfirm title="确认全部彻底删除吗？" @confirm="multipleDelete">
      <el-button type="danger" slot="reference" round>批量删除</el-button>
    </el-popconfirm>
    <el-button type="success" @click="multipleRecover" round
      >批量恢复</el-button
    >
    <el-table
      ref="multipleTable"
      :data="articles"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm title="确认恢复吗？" @confirm="recover(scope.row)">
            <el-button size="mini" slot="reference">恢复</el-button>
          </el-popconfirm>
          <el-popconfirm
            title="确认彻底删除吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference"
              >彻底删除</el-button
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
        :page-sizes="[8, 16, 24, 32]"
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
  TrashArticleList,
  recoverArticle,
  deleteTrashArticle,
  AllDeleteTrashArticle,
} from "@/api/articles";
import request from "@/utils/request";
export default {
  data() {
    return {
      articles: [],
      multipleSelection: [],
      pagination: {
        currentPage: 1,
        pageSize: 8,
        total: 100,
      },
      searchParams: {
        currentPage: "",
        pageSize: 8,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await TrashArticleList(this.searchParams);
      this.articles = res.data.articles;
      this.pagination = res.data.pagination;
    },
    async recover(row) {
      const res = await recoverArticle(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.init();
    },
    async handleDelete(row) {
      const res = await deleteTrashArticle(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => item.id);
    },
    async multipleDelete() {
      const res = await AllDeleteTrashArticle(this.multipleSelection);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
    async multipleRecover() {
      const res = await request.patch(
        `/admin/articles/multiple_restore`,
        this.multipleSelection
      );
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
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
