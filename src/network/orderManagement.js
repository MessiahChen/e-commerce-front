import request from '@/utils/request'

export function getOrderMangementData(params) {
  return request({
    url: '',
    method: 'get',
    params
  })
}
export function getAvailableMoney(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function getTransactionRecord(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function withDrawMoney(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}




