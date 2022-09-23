import request from "@/utils/request";

// 查询列表
export function fetchOrdersList(params) {
  return request({
    url: "/admin/orders",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchOrders(id) {
  return request({
    url: `/admin/orders/${id}`,
    method: "get",
  });
}

//修改为配货状态
export function pickingOrders(id) {
  return request({
    url: `/admin/orders/${id}/picking`,
    method: "patch",
  });
}

//修改为发货状态
export function shippingOrders(id, data) {
  return request({
    url: `/admin/orders/${id}/shipping`,
    method: "patch",
    data,
  });
}

//修改为完成状态
export function finishingOrders(id) {
  return request({
    url: `/admin/orders/${id}/finishing`,
    method: "patch",
  });
}
