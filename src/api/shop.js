import request from "@/utils/request";

// 查询列表
export function ShopList(params) {
  return request({
    url: "/admin/categories",
    method: "get",
    params,
  });
}

// 查询单条
export function ShopFetch(id) {
  return request({
    url: `/admin/categories/${id}`,
    method: "get",
  });
}

// 创建
export function createShop(data) {
  return request({
    url: "/admin/categories",
    method: "post",
    data,
  });
}

// 修改
export function updateShop(id, data) {
  return request({
    url: `/admin/categories/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteShop(id) {
  return request({
    url: `/admin/categories/${id}`,
    method: "delete",
  });
}

// 排序
export function SortShop(id, data) {
  return request({
    url: `/admin/categories/${id}/change_sort`,
    method: "patch",
    data,
  });
}
