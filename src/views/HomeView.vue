<template>
  <div class="home">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="main" style="width: 100%; height: 500px"></div>
    <div id="sexTable" style="width: 100%; height: 500px"></div>
    <OrderCount style="width: 100%; height: 500px" />
  </div>
</template>

<script>
import { statisticsArticle, statisticsSex } from "@/api/statistics";
import * as echarts from "echarts";
import OrderCount from "@/components/echarts/OrderCount";
export default {
  components: { OrderCount },
  name: "HomeView",
  mounted() {
    this.countArticles();
    this.countSex();

    // 当浏览器尺寸变更时，图表尺寸自动适应
    window.onresize = () => {
      this.myChart.resize();
      this.sexTable.resize();
    };
  },
  methods: {
    async countArticles() {
      // 读取数据接口
      const res = await statisticsArticle();

      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("main"), "dark");

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "每月文章数量",
        },
        // 鼠标放上去提示信息
        tooltip: {
          trigger: "axis",
        },
        // 工具栏
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        legend: {
          data: ["数量"],
        },
        // X轴数据
        xAxis: {
          data: res.data.months,
        },
        yAxis: {},
        color: ["#66CCFF"],
        series: [
          {
            name: "数量",
            type: "bar",
            data: res.data.data,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表
      this.myChart.setOption(option);
    },
    async countSex() {
      const res = await statisticsSex();
      this.sexTable = echarts.init(document.getElementById("sexTable"), "dark");
      // const sex = res.data.data.map((item) => {
      //   const name = item.name === "male" ? "男性" : "女性";
      //   return { ...item, name };
      // });
      const sex = [];
      res.data.data.forEach((item) => {
        const name = item.name === "male" ? "男性" : "女性";
        sex.push({ ...item, name });
      });
      const option = {
        title: {
          text: "用户性别",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        color: ["#66CCFF", "#CCFFFF"],
        series: [
          {
            name: "性别",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: sex,
          },
        ],
      };
      this.sexTable.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.info {
  font-size: 14px;
}
</style>
