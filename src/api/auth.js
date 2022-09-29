import request from "@/utils/request";

// 登录
export function SignIn(data) {
  return request({
    url: "/admin/auth/sign_in",
    method: "post",
    data,
  });
}
