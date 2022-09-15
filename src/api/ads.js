import request from "@/utils/request";

// 查询列表
export function fetchAdsList(params) {
  return request({
    url: "/admin/ads",
    method: "get",
    params,
  });
}

// 查询单条
export function fetchAds(id) {
  return request({
    url: `/admin/ads/${id}`,
    method: "get",
  });
}

// 创建
export function createAds(data) {
  return request({
    url: "/admin/ads",
    method: "post",
    data,
  });
}

// 修改
export function updateAds(id, data) {
  return request({
    url: `/admin/ads/${id}`,
    method: "put",
    data,
  });
}

// 删除
export function deleteAds(id) {
  return request({
    url: `/admin/ads/${id}`,
    method: "delete",
  });
}

// 排序
export function sortAds(id, data) {
  return request({
    url: `/admin/ads/${id}/change_sort`,
    method: "patch",
    data,
  });
}

// 查询广告分类列表
export function categoriesList(params) {
  return request({
    url: "/admin/ad_categories",
    method: "get",
    params,
  });
}
