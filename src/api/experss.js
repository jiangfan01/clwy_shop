import request from "@/utils/request";

// 查询列表
export function fetchExpressesList(params) {
  return request({
    url: "/admin/expresses",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchExpresses(id) {
  return request({
    url: `/admin/expresses/${id}`,
    method: "get",
  });
}

// 创建
export function createExpresses(data) {
  return request({
    url: "/admin/expresses",
    method: "post",
    data,
  });
}

// 修改
export function updateExpress(id, data) {
  return request({
    url: `/admin/expresses/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteExpresses(id) {
  return request({
    url: `/admin/expresses/${id}`,
    method: "delete",
  });
}

// 修改排序
export function sortExpresses(id, data) {
  return request({
    url: `/admin/expresses/${id}/change_sort`,
    method: "patch",
    data,
  });
}
