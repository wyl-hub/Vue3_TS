import YLRequest from "./request";
import { BASE_URL } from './request/config'

const request = new YLRequest({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptor: config => {
      const token = ''
      if (token) {
        if (config.headers) config.headers.Authorization = token
        else {
          config.headers = {}
          config.headers.Authorization = token
        }
      }
      return config
    },
    requestInterceptorCatch: err => {
    },
    responseInterceptor: res => {
      return res
    },
    responseInterceptorCatch: err => {
    }
  }
})



export default request