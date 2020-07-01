import {request} from "./request";

export function getHomeMutidate(){
  return request({
    url:'http://localhost:3000/',
  })
}
export function getHomeGoods(config){
  return request({
    url:'http://localhost:3000/result',
  })
}
export function getHomeGoodsClothes(config){
  return request({
    url:'http://localhost:3000/clothes',
  })
}
export function getHomeGoodsFoods(config){
  return request({
    url:'http://localhost:3000/foods',
  })
}
