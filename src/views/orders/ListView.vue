<template>
  <div>
    <div class="demo-input-suffix">
      <el-input
        placeholder="搜索订单号"
        v-model="searchParams.outTradeNo"
        class="search"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-select v-model="searchParams.status" placeholder="选择订单状态">
        <el-option value="1" label="待付款"> </el-option>
        <el-option value="2" label="待发货"> </el-option>
        <el-option value="3" label="配货中"> </el-option>
        <el-option value="4" label="待收货"> </el-option>
        <el-option value="5" label="已完成"> </el-option>
      </el-select>
      <el-row>
        <el-button type="success" round @click="init" class="search-button"
          >搜索</el-button
        >
      </el-row>
      <download-excel
        class="export-excel-wrapper"
        :data="orders"
        :fields="json_fields"
        name="ordersList.xls"
      >
        <el-button type="success" round icon="el-icon-download" class="download"
          >导出excel表格
        </el-button>
      </download-excel>
    </div>

    <div class="order-list-box">
      <el-card
        class="box-card uc-order-item"
        :class="orderStyle[order.status - 1]"
        v-for="order in orders"
        :key="order.id"
      >
        <div class="order-detail">
          <div class="order-summary">
            <div class="order-status">{{ order.status | ordersMode }}</div>
          </div>
          <table class="order-detail-table">
            <thead>
              <tr>
                <th class="col-main">
                  <p class="caption-info">
                    时间：{{ order.createdAt }}
                    <span class="sep">|</span>
                    联系人：{{ order.address.name }}(<a
                      :href="'tel:' + order.address.tel"
                      >{{ order.address.tel }}</a
                    >)
                    <span class="sep">|</span>
                    订单号：{{ order.outTradeNo }}
                  </p>
                </th>
                <th class="col-sub">
                  <p class="caption-price">
                    订单金额：<span class="num">{{ order.totalPrice }}</span
                    >元
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="order-items">
                  <ul class="goods-list">
                    <li v-for="product in order.products" :key="product.id">
                      <div class="figure figure-thumb">
                        <a href="#" target="_blank">
                          <img
                            class="thumb"
                            width="80"
                            height="80"
                            :src="product.image"
                          />
                        </a>
                      </div>
                      <p class="name">
                        <a href="#" target="_blank">{{ product.name }}</a>
                      </p>
                      <p class="price">
                        {{ product.price }} 元 × {{ product.num }}
                      </p>
                    </li>
                  </ul>
                </td>
                <td class="order-actions">
                  <router-link
                    :to="{ name: 'ordersShow', params: { id: order.id } }"
                  >
                    <el-button class="orders-button" type="success">
                      订单详情
                    </el-button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-card>
    </div>
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        ::current-page="pagination.currentPage"
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
import { fetchOrdersList } from "@/api/orders";
export default {
  data() {
    return {
      json_fields: {
        订单编号: "id",
        订单号: "outTradeNo",
        订单状态: "status",
        订单总金额: "totalPrice",
        订单总数量: "totalNum",
        订单创建时间: "createdAt",
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 ",
          },
        ],
      ],
      orders: [],
      orderStyle: [
        "uc-order-item-pay",
        "uc-order-item-shipping",
        "uc-order-item-shipping",
        "uc-order-item-receiving",
        "uc-order-item-finish",
      ],
      searchParams: { currentPage: 1, pageSize: 8, status: "", outTradeNo: "" },
      pagination: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetchOrdersList(this.searchParams);
      this.orders = res.data.orders;
      this.pagination = res.data.pagination;
      if (this.searchParams.length === 0) {
        alert("请输入搜索内容");
      }
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val;
      this.init();
    },
    // async searchAll() {
    //   const res = await fetchOrdersList(this.searchParams);
    //   this.orders = res.data.orders;
    // },
  },
  filters: {
    ordersMode(value) {
      //switch 写法
      // let result;
      // switch (value) {
      //   case 1:
      //     result = "待付款";
      //     break;
      //   case 2:
      //     result = "待发货";
      //     break;
      //   case 3:
      //     result = "配货中";
      //     break;
      //   case 4:
      //     result = "待收货";
      //     break;
      //   default:
      //     result = "已完成";
      // }
      // return result;

      const mode = ["待付款", "待发货", "配货中", "待收货", "已完成"];
      return mode[value - 1];
    },
  },
};
</script>
<style scoped lang="scss">
.demo-input-suffix {
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  .search {
    margin-right: 10px;
    width: 50%;
  }
  .search-button {
    margin-left: 20px;
  }
}
</style>
