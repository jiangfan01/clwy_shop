<template>
  <div class="uc-box uc-main-box">
    <div class="uc-content-box order-view-box">
      <div class="box-hd">
        <div class="more clearfix">
          <h2 class="subtitle">
            订单号：
            <span class="tag tag-subsidy">{{ order.id }}</span>
          </h2>
        </div>
      </div>
      <div class="box-bd">
        <div class="uc-order-item uc-order-item-finish">
          <!--操作-->
          <div class="order-detail">
            <div class="order-status">
              {{ order.status | ordersMode }}
              <div style="float: right; margin-right: 10px">
                <!--配送-->
                <el-popconfirm
                  v-if="order.status === 2"
                  class="delete"
                  title="确定配货吗？"
                  @confirm="handlePicking"
                >
                  <el-button type="primary" slot="reference"> 配货</el-button>
                </el-popconfirm>
                <form
                  style="display: inline-block"
                  class="am-form-inline"
                  v-if="order.status === 3 || order.status === 4"
                >
                  <div class="am-form-group">
                    <el-select v-model="order.expressId">
                      <el-option
                        v-for="express in expresses"
                        :key="express.id"
                        :label="express.name"
                        :value="express.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="am-form-group">
                    <el-input
                      v-model="order.expressNum"
                      placeholder="请输入快递单号"
                    ></el-input>
                  </div>
                  <el-button
                    class="order-change"
                    type="danger"
                    @click="handleShipping"
                  >
                    {{ order.status === 3 ? "发货" : "修改递单号" }}
                  </el-button>
                  <el-button
                    class="order-success"
                    type="success"
                    v-if="order.status === 4"
                    @click="handleFinish"
                  >
                    交易成功
                  </el-button>
                </form>
              </div>
            </div>
          </div>
          <!--进度条，物流订单信息-->
          <div class="order-summary">
            <!--步骤条-->
            <div class="order-progress">
              <el-steps :active="order.status" align-center>
                <el-step
                  title="下单"
                  icon="el-icon-edit"
                  :description="order.createdAt | dateFormat"
                ></el-step>
                <el-step
                  title="付款"
                  icon="el-icon-wallet"
                  :description="order.paidAt | dateFormat"
                ></el-step>
                <el-step
                  title="配货"
                  icon=" el-icon-truck"
                  :description="order.pickedAt | dateFormat"
                ></el-step>
                <el-step
                  title="出库"
                  icon="el-icon-box"
                  :description="order.shippedAt | dateFormat"
                ></el-step>
                <el-step
                  title="交易成功"
                  icon="el-icon-check"
                  :description="order.finishedAt | dateFormat"
                ></el-step>
              </el-steps>
            </div>
            <el-collapse v-if="order.status > 3" class="order-finish">
              <el-collapse-item title="展开物流详情" name="1">
                <iframe
                  name="kuaidi100"
                  :src="`https://www.kuaidi100.com/chaxun?com=${order.express.code}&nu=${order.expressNum}`"
                  width="100%"
                  height="880"
                  marginwidth="0"
                  marginheight="0"
                  hspace="0"
                  vspace="0"
                  frameborder="0"
                  scrolling="no"
                ></iframe>
              </el-collapse-item>
            </el-collapse>
            <!--订单商品-->
            <table class="order-items-table">
              <tbody>
                <tr v-for="product in order.products" :key="product.id">
                  <td class="col col-thumb">
                    <div class="figure figure-thumb">
                      <a
                        target="_blank"
                        href="http://admin.canon4ever.com/shop/product/35/edit"
                      >
                        <img :src="product.image" width="80" height="80" />
                      </a>
                    </div>
                  </td>
                  <td class="col col-name">
                    <p class="name">
                      <a target="_blank" href="//item.mi.com/1151400001.html">{{
                        product.name
                      }}</a>
                    </p>
                  </td>
                  <td class="col col-price">
                    <p class="price">
                      {{ product.price }}元 × {{ product.num }}
                    </p>
                  </td>
                  <td class="col col-actions"></td>
                </tr>
              </tbody>
            </table>
            <!--收货信息-->
            <div id="editAddr" class="order-detail-info">
              <h3 style="text-align: left">收货信息</h3>
              <table class="info-table">
                <tbody>
                  <tr>
                    <th>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</th>
                    <td>{{ order.address.name }}</td>
                  </tr>
                  <tr>
                    <th>联系电话：</th>
                    <td>
                      <a :href="'tel:' + order.address.tel">{{
                        order.address.tel
                      }}</a>
                    </td>
                  </tr>
                  <tr>
                    <th>收货地址：</th>
                    <td>
                      {{ order.address.province }}{{ order.address.city }}
                      {{ order.address.area }}
                      {{ order.address.detail }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="actions"></div>
            </div>
            <!--支付-->
            <div id="editTime" class="order-detail-info">
              <h3 style="text-align: left">支付方式及送货时间</h3>
              <table class="info-table">
                <tbody>
                  <tr>
                    <th>支付方式：</th>
                    <td>在线支付</td>
                  </tr>
                  <tr>
                    <th>送货时间：</th>
                    <td>不限送货时间</td>
                  </tr>
                </tbody>
              </table>
              <div class="actions"></div>
            </div>
            <!--总价-->
            <div class="order-detail-total">
              <table class="total-table">
                <tbody>
                  <tr>
                    <th>商品总价：</th>
                    <td>
                      <span class="num">{{ order.totalPrice }}</span
                      >元
                    </td>
                  </tr>
                  <tr>
                    <th>商品总数量：</th>
                    <td>
                      <span class="num">{{ order.totalNum }}</span
                      >件
                    </td>
                  </tr>
                  <tr>
                    <th class="total">实付金额：</th>
                    <td class="total">
                      <span class="num">{{
                        order.status === 1 ? 0 : order.totalPrice
                      }}</span
                      >元
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchOrders,
  finishingOrders,
  pickingOrders,
  shippingOrders,
} from "@/api/orders";
import { fetchExpressesList } from "@/api/experss";

export default {
  data() {
    return {
      order: {
        address: {},
      },
      expresses: {},
    };
  },
  created() {
    this.init();
    this.initExpresses();
  },
  methods: {
    async init() {
      const res = await fetchOrders(this.$route.params.id);
      this.order = res.data.order;
    },
    async initExpresses() {
      const res = await fetchExpressesList();
      this.expresses = res.data.expresses;
    },
    async handlePicking() {
      const res = await pickingOrders(this.$route.params.id);
      this.$message({
        message: res.message,
        type: "success",
      });
      this.init();
    },
    async handleShipping() {
      const res = await shippingOrders(this.$route.params.id, {
        expressId: this.order.expressId,
        expressNum: this.order.expressNum,
      });
      this.$message({
        message: res.message,
        type: "success",
      });
      this.init();
    },
    async handleFinish() {
      const res = await finishingOrders(this.$route.params.id);
      this.$message({
        message: res.message,
        type: "success",
      });
      this.init();
    },
  },
  filters: {
    ordersMode(value) {
      const mode = ["待付款", "待发货", "配货中", "待收货", "已完成"];
      return mode[value - 1];
    },
  },
};
</script>
<style scoped>
a {
  color: #0e90d2;
  text-decoration: none;
}

a:focus,
a:hover {
  color: #095f8a;
}

.order-status {
  text-align: left;
}

.order-success {
  margin-left: 0px;
}

/* 样式穿透 */
.order-finish >>> .el-collapse-item__header {
  text-align: center !important;
  font-weight: bold !important;
  font-size: 16px !important;
  color: #1f99b0;
}

.el-collapse {
  margin: 30px 0;
}

/*订单详情*/
.uc-main-box {
  font-size: 14px;
}

.uc-box {
  background: #fff;
}

.uc-content-box {
  margin: 0 48px;
}

.uc-content-box .box-hd .title {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
}

.uc-content-box .box-hd small {
  margin-left: 10px;
  font-size: 12px;
  line-height: 1.5;
}

.uc-content-box .box-hd small a {
  color: #757575;
}

.uc-content-box .box-hd .more {
  border-bottom: 1px solid #e0e0e0;
}

.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}

.uc-content-box .box-hd .subtitle {
  margin: 0;
  float: left;
  padding: 14px 0 4px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
}

.uc-content-box .box-hd .tag-subsidy {
  background-color: #1f99b0;
}

.uc-content-box .box-hd .tag {
  display: inline-block;
  padding: 0 12px;
  margin-left: 10px;
  margin-top: -2px;
  font-size: 12px;
  color: #fff;
  vertical-align: middle;
}

.uc-content-box .box-hd .subtitle {
  float: left;
  padding: 14px 0 4px;
  font-weight: 400;
}

.uc-content-box .box-hd .actions {
  float: right;
  padding-top: 5px;
}

.uc-content-box .box-hd .actions .btn {
  margin-left: 5px;
}

.btn-line-gray {
  border-color: #b0b0b0;
  background: #fff;
  color: #757575;
}

.clearfix:after {
  clear: both;
}

.uc-order-item {
  position: relative;
}

.order-view-box .order-detail {
  padding: 25px 0;
  margin-bottom: 5px;
}

.order-view-box .order-status {
  margin-bottom: 25px;
}

.uc-order-item-finish .order-status,
.uc-order-item-finish .order-desc {
  color: #1f99b0;
}

.uc-order-item .order-status {
  font-size: 18px;
}

.order-view-box .order-progress {
  /*height: 65px;*/
  /*margin-bottom: 15px;*/
  margin: 80px 0 60px;
}

.order-view-box .progress-list {
  width: 880px;
  height: 20px;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  border-radius: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #424242;
  background-color: #eee;
}

.order-view-box .progress-list .step-done {
  background-color: #83c44e;
  color: #fff;
}

.order-view-box .progress-list .step-first {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.order-view-box .progress-list .step {
  float: left;
  width: 176px;
  height: 20px;
}

.order-view-box .progress-list .step-done {
  background-color: #83c44e;
  color: #fff;
}

.order-view-box .progress-list .step .info {
  margin-top: 15px;
  color: #757575;
}

.order-view-box .progress-list .step-active {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #83c44e;
  color: #fff;
}

.uc-order-item .order-delivery {
  padding: 0 20px 12px;
  margin: 15px 0 20px;
  border: 1px solid #83c44e;
  font-size: 12px;
  color: #757575;
}

.uc-order-item .order-delivery-detail {
  display: none;
  margin-bottom: 0;
}

.uc-order-item .delivery-num {
  line-height: 30px;
  border-bottom: 1px solid #cfeeab;
}

.uc-order-item .delivery-num a {
  margin-right: 10px;
}

.uc-order-item .delivery-list-wrapper {
  overflow: auto;
}

.uc-order-item .delivery-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.uc-content-box .box-bd .empty {
  margin: 40px 0;
  color: #b0b0b0;
}

.uc-order-item .delivery-list li {
  position: relative;
  padding: 6px 6px 6px 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  _zoom: 1;
}

.uc-order-item .delivery-list li.empty {
  padding: 0;
  text-align: center;
  font-size: 14px;
}

.uc-order-item .order-delivery-trigger {
  display: block;
  margin-top: -1px;
  margin-bottom: 20px;
  padding: 8px 20px;
  border: 1px solid #83c44e;
  text-align: center;
  color: #424242;
}

.uc-order-item .order-delivery-trigger {
  display: block;
  margin-top: -1px;
  margin-bottom: 20px;
  padding: 8px 20px;
  border: 1px solid #83c44e;
  text-align: center;
  color: #424242;
}

.uc-order-item .order-delivery-trigger .iconfont {
  font-size: 16px;
  line-height: 16px;
  vertical-align: text-bottom;
}

.order-view-box .order-items-table {
  width: 100%;
}

.order-view-box .order-items-table .col-thumb {
  width: 100px;
}

.order-view-box .order-items-table .col {
  height: 90px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  color: #333;
}

.order-view-box .order-items-table .figure-thumb {
  width: 80px;
}

.order-view-box .order-items-table .figure-thumb a {
  display: block;
}

.order-view-box .order-items-table .figure-thumb img {
  width: 80px;
  height: 80px;
}

.col {
  width: auto;
}

.order-view-box .order-items-table .col-name {
  width: 290px;
}

.order-view-box .order-items-table .name {
  margin: 0;
}

.order-view-box .order-items-table .name a {
  color: #333;
}

.order-view-box .order-items-table .price {
  margin: 0;
}

.order-view-box .order-items-table .col-actions {
  width: 120px;
  padding: 0;
  text-align: right;
}

.order-view-box .order-detail-info {
  position: relative;
  _height: 120px;
  height: auto;
  min-height: 120px;
  padding: 6px 0 12px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
}

.order-view-box .order-detail-info h3 {
  margin: 0 0 15px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
}

.order-view-box .order-detail-info .info-table {
  color: #757575;
}

.order-view-box .order-detail-info .info-table th,
.order-view-box .order-detail-info .info-table td {
  padding: 3px 0;
  text-align: left;
}

.order-view-box .order-detail-info .info-table th {
  width: 80px;
  font-weight: 400;
}

.order-view-box .order-detail-info .info-table th,
.order-view-box .order-detail-info .info-table td {
  padding: 3px 0;
  text-align: left;
}

.order-view-box .order-detail-info .actions {
  position: absolute;
  top: 5px;
  right: 0;
}

.order-view-box .order-detail-total .total-table {
  width: 255px;
  margin: 0 0 0 auto;
  color: #757575;
}

.order-view-box .order-detail-total .total-table th,
.order-view-box .order-detail-total .total-table td {
  padding: 5px 0;
  text-align: left;
}

.order-view-box .order-detail-total .total-table th {
  width: 100px;
  font-weight: 400;
  text-align: right;
}

.order-view-box .order-detail-total .total-table td {
  text-align: right;
  color: #ff6700;
}

.order-view-box .order-detail-total .num {
  margin-right: 0.125em;
}

.order-view-box .order-detail-total .total-table th.total,
.order-view-box .order-detail-total .total-table td.total {
  padding-top: 25px;
  vertical-align: text-bottom;
}

.order-view-box .order-detail-total .total-table th.total .num,
.order-view-box .order-detail-total .total-table td.total .num {
  font-size: 30px;
  font-weight: 200;
  line-height: 1;
}

.am-form-group {
  display: inline-block;
}

.order-status:after {
  display: block;
  content: "clear";
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
.order-change {
  margin-left: 20px;
}
</style>
