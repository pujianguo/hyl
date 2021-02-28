import axios from 'axios'
import { Notification } from 'element-ui'
import storage from '@/utils/storage'
import config from '../config'

// 防止ie缓存
if (navigator.userAgent.indexOf('MSIE 9') > -1) {
  axios.defaults.headers.common['If-Modified-Since'] = '0'
}

const Request = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

Request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// response
Request.interceptors.response.use(res => {
  if (res.data.code === 0) {
    return res.data.data
  } else {
    Notification.error({
      title: '错误提示',
      message: res.data.msg || '',
    })
    return Promise.reject(res.data.msg || '')
  }
}, error => {
  let msg = ''
  if (error.response) {
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message
    } else {
      msg = error.response.data
    }
  } else {
    msg = error.message
  }
  // 这里统一做错误提示，如果要单独处理，跳过这里即可
  Notification.error({
    title: '错误提示',
    message: msg,
  })
  console.log('api response error: ', msg)
  return Promise.reject(msg)
})

export const _get = (url, params = null) => {
  return Request.get(url, { params: params })
}
export const _post = (url, data) => {
  return Request.post(url, data)
}
export const _patch = (url, data) => {
  return Request.patch(url, data)
}
export const _put = (url, data) => {
  return Request.put(url, data)
}
export const _delete = (url, data = null) => {
  return Request.delete(url, { data: data })
}
