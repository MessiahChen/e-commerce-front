import request from '@/utils/request'

export function getOrderMangementData(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}




