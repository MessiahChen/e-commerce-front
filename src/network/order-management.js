import request from '@/utils/request'

export function getOrderMangementData(params) {
  return request({
    url: '/vue-admin-template/table/list',
    // url: 'http://localhost:9030/bvoOrder/getSalBySaoId',
    method: 'get',
    params
  })
}

export function getSalBySaoid(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/getSalBySaoId',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function getVosByDsrId(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/getVosByDsrId',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function update(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/update',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function getProBySao(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/getProBySao',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function sao(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/sao',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function shipment(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/shipment',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}






