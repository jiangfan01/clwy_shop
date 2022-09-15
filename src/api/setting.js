import request from "@/utils/request";
// 查询列表
export function fetchSettingList(params) {
  return request({
    url: "/admin/settings",
    method: "get",
    params,
  });
}

//修改
export function updateSetting(id, data) {
  return request({
    url: "/admin/settings",
    method: "put",
    data,
  });
}
