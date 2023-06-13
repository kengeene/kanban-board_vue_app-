import request from '@/utils/requests';

export async function getTasks(data) {
  return request({
    url: 'http://localhost:3000/tasks',
    method: 'get',
    data,
  });
}
