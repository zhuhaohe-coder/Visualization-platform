import request from './request'

// 数据获取接口,后台已经处理跨越问题
export const getPowerScreenData = () => {
  return request.get({
    url: '/powerscreen'
  })
}
