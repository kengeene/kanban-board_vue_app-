import request from "@/utils/requests";

export async function createTask(payload) {
  return request({
    url: `${process.env.VUE_APP_API_BASE_URL}tasks`,
    method: "post",
    data: payload,
  });
}

export async function editTask(payload) {
  return request({
    url: `${process.env.VUE_APP_API_BASE_URL}tasks/${payload.id}`,
    method: "put",
    data: payload,
  });
}

export async function getTasks(data) {
  return request({
    url: `${process.env.VUE_APP_API_BASE_URL}tasks`,
    method: "get",
    data,
  });
}

export async function getTaskTypes(data) {
  return request({
    url: `${process.env.VUE_APP_API_BASE_URL}tasks/types`,
    method: "get",
    data,
  });
}

export async function getStatuses(data) {
  return request({
    url: `${process.env.VUE_APP_API_BASE_URL}tasks/statuses`,
    method: "get",
    data,
  });
}
