<template>
  <el-container>
    <el-header>
      <img
        src="https://images.clwy.cn/common/logo.png"
        alt="长乐未央Logo"
        class="logo"
      />
      <h1>长乐未央后台管理</h1>
    </el-header>
    <el-container>
      <Aside />
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <el-footer
          >Copyright 2013-2022 CLWY Inc. All Rights Reserved.</el-footer
        >
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/AsideBar";

export default {
  components: { Aside },
};
</script>
