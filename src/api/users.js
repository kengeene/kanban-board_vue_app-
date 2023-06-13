import request from "@/utils/requests";

export async function getUsers(data) {
  return request({
    url: "http://localhost:3000/users",
    method: "get",
    data,
  });
}
