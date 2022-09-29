const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    externals: {
      echarts: "echarts", // 配置使用CDN
    },
  },
});
