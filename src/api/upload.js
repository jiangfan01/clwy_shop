import request from "@/utils/request";
// 查询列表
export function fetchToken() {
  return request({
    url: "/admin/uploads",
    method: "get",
  });
}
