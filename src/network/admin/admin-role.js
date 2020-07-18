import request from '@/utils/request'

export function getAllRole(getAllRoleVO) {
  return request({
    url: 'http://localhost:9010/admin/roles',
    method: 'get',
  })
}

export function addRole(addRoleVO){
  return request({
    url: 'http://localhost:9010/dataDictionary/addRoleInfo',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addRoleVO
  })
}

export function deleteRole(roleId){
  return request({
    url: 'http://localhost:9010/dataDictionary/deleteRole',
    method: 'delete',
    params: roleId
  })
}

export function updateRole(roleUpdateVO){
  return request({
    url: 'http://localhost:9010/dataDictionary/updateRole',
    method: 'post',
    data: roleUpdateVO
  })
}
