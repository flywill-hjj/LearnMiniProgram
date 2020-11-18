import {
  baseURL
} from './config.js'
// 工具函数
//网络请求的封装
export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}