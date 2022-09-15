<template>
  <div class="home">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        长乐未央 <br />
        是什么意思？
      </div>
      <div class="info">
        汉时，有长乐宫又有未央宫。"长乐未央"四字，常见于汉宫瓦当。
        "长乐"的"乐"，最早出自周公旦制礼作"乐"的乐。"乐者，天地之和也"《礼记·乐记》，"乐"的本质是"和"。"未央"意为未尽，没有穷尽。最早出自诗经（庭燎.小雅）夜如何其？夜未央，庭燎之光。
        "长乐未央"意为永远快乐，没有穷尽。
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped lang="scss">
.info {
  font-size: 14px;
}
</style>
