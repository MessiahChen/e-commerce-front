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

// export function request(config){
//   // 1.创建axios实例
//   const instance = axios.create({
//     timeout:5000
//   })

//   // 2.axios的拦截器
//   // 发送请求是否成功-请求拦截
//   axios.interceptors.request.use(config => {
//     console.log(config);
//     return config
//   },err => {
//     console.log(err);
//   });
//   // 接收请求是否成功-响应拦截
//   axios.interceptors.response.use(res => {
//     console.log(res);
//     return res.data
//   },err => {
//     console.log(err);
//   });

//   // 3.发送真正的网络请求
//   return instance(config)

// }