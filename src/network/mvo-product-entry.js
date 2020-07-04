import request from '@/utils/request'

export function getAllProduct(getAllProductVO) {
  return request({
    url: 'http://localhost:9040/productEntry/getAllProduct',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllProductVO
  })
}
