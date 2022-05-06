import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YLRequestInterceptors, YLRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

/**
 *   拦截器执行顺序  
 *   请求拦截器   先添加的后执行
 *   响应拦截器   先添加的先执行
 */

// 默认是否展示loading
const DEFAULT_LOADING = true


class YLRequest {
  instance: AxiosInstance
  interceptors?: YLRequestInterceptors
  loadingCount: number    // 因为 loading 的对象是同一个   避免响应快的请求提前关闭loading
  loading?: LoadingInstance
  constructor(config: YLRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.loadingCount = 0

    // 实例拦截器 
    // （根据配置 自己可以传对应的拦截器 也可以不传  所以不同的实例有不同的拦截效果）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    )


    // 所有实例都有的拦截器
    // （直接在创建的实例对象上面添加拦截器，所有创建的实例都会绑上这个公共拦截器）
    this.instance.interceptors.request.use(
      config => {
        return config
      },
      err => {
      }
    )

    this.instance.interceptors.response.use(
      res => {
        return res.data
      },
      err => {
      }
    )

  }

  request<T>(config: YLRequestConfig<T>): Promise<T> {
    return new Promise((reslove, reject) => {
      // 请求单独拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 每个请求在发送之前会判断是否展示loading 
      // 保证每个请求是否展示loading 不影响其他的请求  所以 每次请求都会判断该请求是否展示loading
      // 因为 ElLoading.service 返回的相同的一个对象 所以保存到实例上
      const loadingFlag = config.showLoading ?? DEFAULT_LOADING
      if (loadingFlag) {
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        this.loadingCount++
      }

      this.instance.request<any, T>(config)
      .then(res => {
        // 响应单独拦截器
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        reslove(res)
      })
      .finally(() => {
        setTimeout(() => {
          if (loadingFlag) this.loadingCount--
          if (this.loadingCount === 0) this.loading?.close()
        }, 1000);
      })
    })
  }

  get<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
}

export default YLRequest