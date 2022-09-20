import request from "@/utils/request";

// 查询列表
export function fetchProductsList(params) {
  return request({
    url: "/admin/products",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchProducts(id) {
  return request({
    url: `http://localhost:3000/admin/products/${id}`,
    method: "get",
  });
}

// 创建
export function createProducts(data) {
  return request({
    url: "http://localhost:3000/admin/products",
    method: "post",
    data,
  });
}

// 修改
export function updateProducts(id, data) {
  return request({
    url: `http://localhost:3000/admin/products/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteProducts(id) {
  return request({
    url: `http://localhost:3000/admin/products/${id}`,
    method: "delete",
  });
}

// 修改商品属性
export function recoverProducts(id, data) {
  return request({
    url: `http://localhost:3000/admin/products/${id}/change_attr`,
    method: "patch",
    data,
  });
}
