import request from '@/utils/request'

export function getAllPar(getAllParVO) {
  return request({
    url: 'http://localhost:9040/ParEntry/getAllPar',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllParVO
  })
}

export function searchPar(searchParVO) {
  return request({
    url: 'http://localhost:9040/ParEntry/searchParByTitle',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchParVO
  })
}

export function addPar(addParVO){
  return request({
    url: 'http://localhost:9040/ParEntry/addParInfo',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addParVO
  })
}

export function deletePar(proId){
  return request({
    url: 'http://localhost:9040/ParEntry/deleteParInfo',
    method: 'delete',
    params: proId
  })
}

export function batchDeletePar(proId){
  return request({
    url: 'http://localhost:9040/ParEntry/deleteParInfo',
    method: 'delete',
    params: proId
  })
}

export function getParWhenUpdate(proId){
  return request({
    url: 'http://localhost:9040/ParEntry/getParInfoWhenUpdate',
    method: 'get',
    params: proId
  })
}
export function updatePar(ParUpdateVO){
  return request({
    url: 'http://localhost:9040/ParEntry/updateParInfo',
    method: 'patch',
    data: ParUpdateVO
  })
}

