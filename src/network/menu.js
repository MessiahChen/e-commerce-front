import {request} from "./request";

export function addMenu(config){
  return request({
    url:'localhost:9010/menu/addMenu',
  })
}


