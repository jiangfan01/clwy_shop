import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss";
import * as filters from "./filters";
import io from "socket.io-client";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  data() {
    return {
      // 定义空属性socket
      socket: null,
    };
  },
  created() {
    // 调用下面的initWebSocket方法
    this.initWebSocket();
  },
  methods: {
    // 初始化websocket
    initWebSocket() {
      // 调用 io 方法去使用 ws 协议访问 localhost:3000 接口
      this.socket = io("ws://localhost:3000");
      // console.log(this.socket); // 得到 socket 对象，里面包含本次连接的所有信息
      // 通过后端给定的 init 事件，测试连接是否成功
      this.socket.on("init", (msg) => {
        console.log(msg);
      });
    },
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
