import request from '@/utils/request'

export function getStores(dsrId){
  return request({
    url: 'http://localhost:9020/store/getStrsByDsrId',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    params: proId
  })
}

export function addStore(addStoreVO){
  return request({
    url: 'http://localhost:9020/store/insertStr',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addStoreVO
  })
}

export function addEba(EbaVO){
  return request({
    url: 'http://localhost:9020/store/insertEba',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: EbaVO
  })
}
