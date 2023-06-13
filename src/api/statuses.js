import request from '@/utils/requests';

export async function getStatuses(data) {
  return request({
    url: '/statuses',
    method: 'get',
    data,
  });
}
