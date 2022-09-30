import request from "@/utils/request";
// 查询列表
export function statisticsArticle() {
  return request({
    url: "/admin/charts/articles",
    method: "get",
  });
}

// 查询列表
export function statisticsSex() {
  return request({
    url: "/admin/charts/sexes",
    method: "get",
  });
}

// 订单统计接口
export function fetchOrderCount() {
  return request({
    method: "get",
    url: "/admin/charts/orders",
  });
}
