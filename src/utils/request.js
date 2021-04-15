import axios from 'axios'
import config from '@/config'
import { Toast } from 'vant'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_BASE_API
      : '/api',
  timeout: config.timeout
})

service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res.data
    } else {
      Toast(res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default service
