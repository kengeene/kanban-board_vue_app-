import request from "@/utils/requests";

export async function getStatuses(data) {
  return request({
    url: `${process.env.VUE_APP_API_BASE_URL}taskStatuses`,
    method: "get",
    data,
  });
}
