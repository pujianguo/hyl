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

// 不需要验证token的接口白名单
const noAuthWhiteList = [
  'account/login/validate_code',
  'account/login/phone',
  'account/login/config',
  'account/login/wechat_web',
]
Request.interceptors.request.use(config => {
  const token = storage.getToken()
  if (token) {
    config.headers.Token = token
  } else {
    if (!noAuthWhiteList.includes(config.url)) {
      toLogin()
      return Promise.reject(new Error('not login'))
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response
Request.interceptors.response.use(res => {
  return res.data
}, error => {
  let msg = ''
  if (error.response) {
    if (error.response.status === 401) { // 未登陆
      toLogin()
      return
    }
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message
    } else {
      msg = error.response.data
    }
  } else {
    msg = error.message
  }
  if (msg !== 'not login') {
    // 这里统一做错误提示，如果要单独处理，跳过这里即可
    Notification.error({
      title: '错误提示',
      message: msg,
    })
  }
  console.log('api response error: ', msg)
  return Promise.reject(msg)
})

export const toLogin = () => {
  if (storage.getToLoginFlag()) {
    return
  }
  const hash = window.location.hash
  if (hash !== '#/login') {
    const path = hash.slice(1)
    storage.setLocationHref(path)
  }
  storage.rmToken()
  storage.setToLoginFlag()
  Notification.error({
    title: '错误提示',
    message: '登录信息已过期，请重新登录',
  })
  window.location = '/#/login'
}

export const _get = (url, params = null) => {
  return Request.get(url, { params: params })
}
export const _download = (url, params = null) => {
  return Request.get(url, { params: params, responseType: 'blob' })
}

export const _post = (url, data) => {
  return Request.post(url, data)
}
export const _upload = (url, data, config = null) => {
  return Request.post(url, data, config)
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
