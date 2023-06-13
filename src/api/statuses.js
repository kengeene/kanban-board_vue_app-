import request from '@/utils/requests';

export async function getStatuses(data) {
  return request({
    url: 'http://localhost:3000/taskStatuses',
    method: 'get',
    data,
  });
}
