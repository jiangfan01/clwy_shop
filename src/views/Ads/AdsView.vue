<template>
  <div>
    <router-link :to="{ name: 'adsCreate' }">
      <el-button type="primary" round>新增广告</el-button>
    </router-link>
    <el-form :inline="true" :model="searchParams" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input
          v-model="searchParams.title"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="searchParams.categoryId" placeholder="活动区域">
          <el-option
            v-for="category in categories"
            :label="category.name"
            :value="category.id"
            :key="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="init">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success">取消</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="ads" stripe style="width: 100%">
      <el-table-column label="编号">
        <template slot-scope="scope"> {{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="链接地址">
        <template slot-scope="scope"
          ><el-link to="" :href="scope.row.url">{{
            scope.row.url
          }}</el-link></template
        >
      </el-table-column>
      <el-table-column label="所属分类">
        <template slot-scope="scope">{{ scope.row.category.name }}</template>
      </el-table-column>
      <el-table-column label="排序" width="80">
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.sort"
            @change="handleChange(scope.row.id, scope.row.sort)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat }}</template
        >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ name: 'adsEdit', params: { id: scope.row.id } }">
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
import { fetchAdsList, deleteAds, sortAds, categoriesList } from "@/api/ads";

export default {
  data() {
    return {
      ads: [],
      categories: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      searchParams: {
        title: "",
        categoryId: "",
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetchAdsList(this.searchParams);
      this.ads = res.data.ads;
      this.pagination = res.data.pagination;
      const test = await categoriesList();
      this.categories = test.data.categories;
    },
    handleEdit(row) {
      console.log(row);
    },
    async onSubmit() {
      //拼接字符
      // const res = await request.get(
      //   `/admin/ads?title=${this.searchParams.title}&categoryId=${this.searchParams.categoryId}`
      // );
      //调用data定义的方法（简化写法）
      // const res = await request.get(`/admin/ads`, {
      //   params: {
      //     title: this.searchParams.title,
      //     categoryId: this.searchParams.categoryId,
      //   },
      // });
      //最终简化版
      // const res = await request.get(`/admin/ads`, {
      //   params: this.searchParams,
      // });
      // this.ads = res.data.ads;
    },
    async handleDelete(row) {
      const res = await deleteAds(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
    async handleChange(id, sort) {
      const res = await sortAds(id, { sort });
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
