import request from "@/utils/request";

// 查询列表
export function categoryList(params) {
  return request({
    url: "/admin/ad_categories",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchCategory(id) {
  return request({
    url: `/admin/ad_categories/${id}`,
    method: "get",
  });
}

// 创建
export function createCategory(data) {
  return request({
    url: "/admin/ad_categories",
    method: "post",
    data,
  });
}

// 修改
export function updateCategory(id, data) {
  return request({
    url: `/admin/ad_categories/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteCategory(id) {
  return request({
    url: `/admin/ad_categories/${id}`,
    method: "delete",
  });
}

// 排序
export function categorySort(id, data) {
  return request({
    url: `/admin/ad_categories/${id}/change_sort`,
    method: "patch",
    data,
  });
}
