import request from '@/utils/request'

export function getAllProduct(getAllProductImageVO) {
  return request({
    url: 'http://localhost:9040/productImage/getAllProductImage',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllProductImageVO
  })
}

export function searchProduct(searchProductImageVO) {
  return request({
    url: 'http://localhost:9040/productImage/searchProductImageByTitle',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchProductImageVO
  })
}

export function getAllCategory(){
  return request({
    url: 'http://localhost:9040/productImage/getAllCategory',
    method: 'get'
  })
}

export function addProduct(productCategoryAddVO){
  return request({
    url: 'http://localhost:9040/productImage/addProductImage',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: productCategoryAddVO
  })
}

export function deleteProduct(proId){
  return request({
    url: 'http://localhost:9040/productImage/deleteProductInfo',
    method: 'delete',
    params: proId
  })
}
export function getProductWhenUpdate(proId){
  return request({
    url: 'http://localhost:9040/productImage/getProductCatWhenUpdate',
    method: 'get',
    params: proId
  })
}
export function updateProduct(productCatUpdateVO){
  return request({
    url: 'http://localhost:9040/productImage/updateProductImage',
    method: 'patch',
    data: productCatUpdateVO
  })
}
