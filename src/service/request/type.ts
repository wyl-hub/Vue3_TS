import { AxiosRequestConfig, AxiosResponse } from 'axios'


interface YLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface YLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YLRequestInterceptors<T>
  showLoading?: boolean
}

export { YLRequestInterceptors, YLRequestConfig }