import request from "@/utils/requests";

export async function getTasks(data) {
  return request({
    url: "http://localhost:3000/tasks",
    method: "get",
    data,
  });
}

export async function getTaskTypes(data) {
  return request({
    url: "http://localhost:3000/taskTypes",
    method: "get",
    data,
  });
}

export async function editTask(payload) {
  return request({
    url: `http://localhost:3000/tasks/${payload.id}`,
    method: "put",
    data: payload,
  });
}
