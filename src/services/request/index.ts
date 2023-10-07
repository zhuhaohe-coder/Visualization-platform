import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

interface RequestInterface {
  instance: import('axios').AxiosInstance
  constructor: Function
  request: Function
  get: Function
  post: Function
}

class Request implements RequestInterface {
  instance: import('axios').AxiosInstance

  constructor(baseURL: string = BASE_URL, timeout: number = TIMEOUT) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }
  request(config: object) {
    //接收异常
    return new Promise((reslove, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          reslove(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get(config: object) {
    return this.request({ ...config, method: 'get' })
  }
  post(config: object) {
    return this.request({ ...config, method: 'post' })
  }
}

export default new Request()
