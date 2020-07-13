import request from '@/utils/request'

export function getAllCdm(getAllCdmVO) {
  return request({
    url: 'http://localhost:9040/CdmEntry/getAllCdm',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllCdmVO
  })
}

export function searchCdm(searchCdmVO) {
  return request({
    url: 'http://localhost:9040/CdmEntry/searchCdmByTitle',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchCdmVO
  })
}

export function addCdm(addCdmVO){
  return request({
    url: 'http://localhost:9040/CdmEntry/addCdmInfo',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addCdmVO
  })
}

export function deleteCdm(proId){
  return request({
    url: 'http://localhost:9040/CdmEntry/deleteCdmInfo',
    method: 'delete',
    Cdmams: proId
  })
}

export function batchDeleteCdm(proId){
  return request({
    url: 'http://localhost:9040/CdmEntry/deleteCdmInfo',
    method: 'delete',
    Cdmams: proId
  })
}

export function getCdmWhenUpdate(proId){
  return request({
    url: 'http://localhost:9040/CdmEntry/getCdmInfoWhenUpdate',
    method: 'get',
    Cdmams: proId
  })
}
export function updateCdm(CdmUpdateVO){
  return request({
    url: 'http://localhost:9040/CdmEntry/updateCdmInfo',
    method: 'patch',
    data: CdmUpdateVO
  })
}

