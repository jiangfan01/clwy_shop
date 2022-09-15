import request from "@/utils/request";

// 查询列表
export function fetchArticleList(params) {
  return request({
    url: "/admin/articles",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchArticle(id) {
  return request({
    url: `/admin/articles/${id}`,
    method: "get",
  });
}

// 创建
export function createArticle(data) {
  return request({
    url: "/admin/articles",
    method: "post",
    data,
  });
}

// 修改
export function updateArticle(id, data) {
  return request({
    url: `/admin/articles/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteArticle(id) {
  return request({
    url: `/admin/articles/${id}`,
    method: "delete",
  });
}

//多选删除到回收站
export function multiple_deleteArticle(data) {
  return request({
    url: `/admin/articles/multiple_delete`,
    method: "post",
    data,
  });
}

// 查询列表
export function TrashArticleList(params) {
  return request({
    url: "/admin/articles/trash",
    method: "get",
    params,
  });
}

// 回收站恢复
export function recoverArticle(id) {
  return request({
    url: `/admin/articles/${id}/restore`,
    method: "patch",
  });
}

// 回收站彻底删除
export function deleteTrashArticle(id) {
  return request({
    url: `/admin/articles/${id}/force`,
    method: "delete",
  });
}

// 多选彻底删除
export function AllDeleteTrashArticle(data) {
  return request({
    url: `/admin/articles/multiple_delete/force`,
    method: "post",
    data,
  });
}
