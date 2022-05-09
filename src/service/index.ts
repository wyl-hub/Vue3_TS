import YLRequest from "./request";
import { BASE_URL } from './request/config'

const request = new YLRequest({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptor: config => {
      const token = window.localStorage.getItem('token')
      if (token) {
        if (config.headers) config.headers.Authorization = token
        else {
          config.headers = {}
          config.headers.Authorization = token
        }
      }
      return config
    }
  }
})



export default request