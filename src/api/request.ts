import axios,{ AxiosResponse, AxiosRequestConfig } from 'axios'

const request=axios.create({
  baseURL:'http://localhost:5000/xc-blog',
  timeout:30000,
})
//请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.token = sessionStorage.getItem('token') || ''
  } 
  return config
},(error:any) => {
  return Promise.reject(error)
})
//响应拦截器
request.interceptors.response.use( (response:AxiosResponse) =>{
  return response.data
},(error:any) => {
  return Promise.reject(error)
})
export default request