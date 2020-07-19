import request from '@/utils/request'

export function getAllMenu() {
  return request({
    url: 'http://localhost:9010/admin/menus',
    method: 'get',
  })
}

export function searchMenu(searchMenuVO) {
  return request({
    url: 'http://localhost:9010/dataDictionary/searchMenu',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchMenuVO
  })
}

export function addMenu(addMenuVO) {
  return request({
    url: 'http://localhost:9010/admin/addMenu',
    method: 'put',
    data: addMenuVO
  })
}

export function deleteMenu(menuId) {
  return request({
    url: 'http://localhost:9010/admin/deleteMenu',
    method: 'delete',
    params: menuId
  })
}
