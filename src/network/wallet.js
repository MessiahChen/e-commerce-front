import request from '@/utils/request'

export function walletRegister(params) {
  console.log(params)
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://localhost:9050/wallet/register',
    method: 'put',
    params
  })
}

export function getAvailableMoney(params) {
  console.log(params)
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://localhost:9050/wallet/getInfo',
    method: 'get',
    params
  })
}

export function getTransactionRecord(params) {
  console.log(params)
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://localhost:9050/wallet/check',
    method: 'post',
    // method:'get',
    params
  })
}

export function withDrawMoney(params) {
  console.log(params)
  return request({
    url: 'http://localhost:9050/wallet/withdraw',
    // url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function depositMoney(params) {
  console.log(params)
  return request({
    url: 'http://localhost:9050/wallet/deposit',
    // url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function changePassword(params) {
  console.log(params)
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://location:9050/wallet/changePassword',
    method: 'post',
    params
  })
}
