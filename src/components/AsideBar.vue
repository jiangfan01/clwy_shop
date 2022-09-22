<template>
  <el-aside width="200px">
    <el-col>
      <el-menu :router="true" default-active="/" class="el-menu-vertical-demo">
        <el-menu-item index="/">
          <i class="el-icon-pie-chart"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="/articles">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>新闻管理</span>
          </template>
          <el-menu-item index="/articles/list">新闻</el-menu-item>
          <el-menu-item index="/articles/trash">回收站</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-shopping-cart-full"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/category">商品分类</el-menu-item>
          <el-menu-item index="/products">商品</el-menu-item>
        </el-submenu>
        <el-submenu index="/">
          <template slot="title">
            <i class="el-icon-toilet-paper"></i>
            <span>广告管理</span>
          </template>
          <el-menu-item index="/list">广告分类</el-menu-item>
          <el-menu-item index="/ads">广告</el-menu-item>
        </el-submenu>
        <el-menu-item index="/users">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/orders">
          <i class="el-icon-shopping-bag-1"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/expresses">
          <i class="el-icon-ship"></i>
          <span slot="title">物流管理</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-aside>
</template>
