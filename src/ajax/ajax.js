import axios from 'axios'
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import store from "@/store"

const instance = axios.create({
  baseURL:'/api',
  timeout:20000
})

//请求拦截器
instance.interceptors.request.use( config=>{
  // 使用uuid用于游客登录
  let userTempId = store.state.Users.userTempId
  if(userTempId){
    config.headers.userTempId = userTempId;
  }
  // 使用token表示正式登录
  // let token = store.state.Users.userInfo.token
  let token = store.state.Users.token
  if(token){
    config.headers.token = token;
  }

   //请求之前添加进度条
  Nprogress.start()
  return config
})

//响应拦截器
instance.interceptors.response.use(
  //响应之后添加进度条
  response=>{
    Nprogress.done()
    return response.data
  },
  error=>{
    Nprogress.done()
    //响应之后添加进度条
    //统一处理请求错误
    alert('请求失败'+ error.message || '未知错误')
    //返回失败的promise
    // return Promise.reject(new Error('请求失败'))
    //中断promise链;

    return new Promise(()=>{})
  }
)

export default instance