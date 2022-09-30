<template>
  <div>
    <div id="orders" class="charts"></div>
  </div>
</template>

<script>
import { fetchOrderCount } from "@/api/statistics";
import * as echarts from "echarts";
export default {
  mounted() {
    // 调用下面的 OrderCount 方法
    this.countOrder();

    this.$root.socket.on("update-order-counts", (data) => {
      // 传入相关配置
      const option = this.options(data, "line", "每月订单数量");
      // 渲染图表
      this.ordertable.setOption(option);
    });

    // 当浏览器尺寸变更时，图表尺寸自动适应
    window.onresize = () => {
      this.ordertable.resize();
    };
  },
  methods: {
    async countOrder() {
      // 读取数据接口
      const res = await fetchOrderCount();

      // 基于准备好的dom，初始化echarts实例
      this.ordertable = echarts.init(document.getElementById("orders"), "dark");

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "订单数据统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#66CCFF",
            },
          },
        },
        legend: {
          data: [],
        },
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: res.data.months,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "order",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: res.data.data,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表
      this.ordertable.setOption(option);
    },
  },
};
</script>
<style scoped>
.charts {
  width: 100%;
  height: 500px;
}
</style>
