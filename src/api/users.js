import request from "@/utils/requests";

export async function getUsers(data) {
  return request({
    url: `${process.env.VUE_APP_API_BASE_URL}users`,
    method: "get",
    data,
  });
}
