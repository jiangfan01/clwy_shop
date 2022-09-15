<template>
  <div>
    <router-link :to="{ name: 'usersCreate' }">
      <el-button type="primary" round>新增</el-button>
    </router-link>
    <el-form :inline="true" :model="searchParams" class="demo-form-inline">
      <el-form-item label="用户">
        <el-input
          v-model="searchParams.username"
          placeholder="请输入用户"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="init">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="users" style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="180">
        <template slot-scope="scope">
          <i
            :class="scope.row.sex === 1 ? 'el-icon-male' : 'el-icon-female'"
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="管理员" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.admin"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleAdmin(scope.row)"
          >
          </el-switch>
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
          <router-link
            :to="{ name: 'usersEdit', params: { id: scope.row.id } }"
          >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
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
import { fetchUsersList, sortUser, deleteUser } from "@/api/user";
export default {
  data() {
    return {
      users: [],
      searchParams: {
        username: "",
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
      const res = await fetchUsersList(this.searchParams);
      this.users = res.data.users;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    async handleDelete(row) {
      const res = await deleteUser(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
    },
    onSubmit() {
      console.log("submit!");
    },
    async toggleAdmin(row) {
      const res = await sortUser(row.id);
      if (res.code !== 20000) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
    },
  },
};
</script>
