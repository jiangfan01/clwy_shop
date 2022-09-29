<template>
  <div>
    <el-button type="primary" round @click="handleCreate">新增新闻</el-button>
    <el-popconfirm title="确认全部删除吗？" @confirm="multipleDelete">
      <el-button type="danger" slot="reference" round>批量删除</el-button>
    </el-popconfirm>
    <el-form :inline="true" :model="searchParams" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="searchParams.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="init" round>查询</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column label="新闻内容" width="180">
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
          <el-button size="mini" @click="handleEdit(scope.row.id)">
            编辑
          </el-button>

          <el-popconfirm
            title="确认删除到回收站吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <ArticlesDialogs ref="form" :isEdit="isEdit" />
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
  fetchArticleList,
  deleteArticle,
  multiple_deleteArticle,
} from "@/api/articles";
import ArticlesDialogs from "@/views/articles/components/ArticlesDialog";
export default {
  components: {
    ArticlesDialogs,
  },
  data() {
    return {
      articles: [],
      multipleSelection: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      searchParams: {
        title: "",
        currentPage: 1,
        pageSize: 10,
      },
      isEdit: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetchArticleList(this.searchParams);
      this.articles = res.data.articles;
      this.pagination = res.data.pagination;
    },
    async handleDelete(row) {
      const res = await deleteArticle(row.id);
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
      const res = await multiple_deleteArticle(this.multipleSelection);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
    onSubmit() {},
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val;
      this.init();
    },
    handleCreate() {
      this.$refs.form.dialogFormVisible = true;
      this.$refs.form.resetForm();
      this.isEdit = false;
    },
    handleEdit(id) {
      this.$refs.form.dialogFormVisible = true;
      this.isEdit = true;
      this.$refs.form.initForm(id);
    },
  },
};
</script>
