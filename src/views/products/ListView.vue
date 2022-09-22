<template>
  <div>
    <router-link :to="{ name: 'productsCreate' }">
      <el-button type="primary" round>新增</el-button>
    </router-link>
    <el-form
      :inline="true"
      :model="searchParams"
      class="demo-form-inline"
      ref="ruleForm"
    >
      <el-form-item label="商品名">
        <el-input
          v-model="searchParams.name"
          placeholder="请输入商品人"
        ></el-input>
      </el-form-item>
      <el-form-item label="属性分类">
        <el-select v-model="searchParams.categoryId" placeholder="请选择">
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
          </el-option-group> </el-select
      ></el-form-item>
      <el-form-item label="上架">
        <el-select v-model="searchParams.sale" placeholder="活动区域">
          <el-option label="不限" value=""></el-option>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐">
        <el-select v-model="searchParams.recommend" placeholder="活动区域">
          <el-option label="不限" value=""></el-option>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="置顶">
        <el-select v-model="searchParams.top" placeholder="活动区域">
          <el-option label="不限" value=""></el-option>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新品">
        <el-select v-model="searchParams.new" placeholder="活动区域">
          <el-option label="不限" value=""></el-option>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="热门">
        <el-select v-model="searchParams.hot" placeholder="活动区域">
          <el-option label="不限" value=""></el-option>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="init">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="products" style="width: 100%">
      <el-table-column label="编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缩略图">
        <template slot-scope="scope">
          <el-image :src="scope.row.image" id="pic"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架" class="switch">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.sale"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleShop(scope.row, 'sale')"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="推荐" class="switch">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.recommend"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleShop(scope.row, 'recommend')"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="置顶" class="switch">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.top"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleShop(scope.row, 'top')"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="新品" class="switch">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.new"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleShop(scope.row, 'new')"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="热门" class="switch">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.hot"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleShop(scope.row, 'hot')"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.createdAt | dateFormat }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'productsEdit', params: { id: scope.row.id } }"
          >
            <el-button size="mini"> 编辑 </el-button>
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
      <span class="demonstration">完整功能</span>
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
  fetchProductsList,
  recoverProducts,
  deleteProducts,
} from "@/api/products";
import { ShopList } from "@/api/shop";

export default {
  data() {
    return {
      products: [],
      searchParams: { name: "", categoryId: "", currentPage: 1, pageSize: 10 },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 22,
      },
      categories: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetchProductsList(this.searchParams);
      this.products = res.data.products;
      const test = await ShopList();
      this.categories = test.data.categories;
    },
    async handleDelete(row) {
      const res = await deleteProducts(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.init();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async toggleShop(row, type) {
      const res = await recoverProducts(row.id, { type });
      console.log(res);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
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
