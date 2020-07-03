import request from '@/utils/request'

export function walletLogin(params) {
  return request({
    url: 'http://localhost:9050/add/wallet',
    method: 'put',
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
export function updatePassword(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'post',
    params
  })
}
