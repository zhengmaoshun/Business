import {getUserTempId} from "@/utils/userAbout";
import {reqUserRegister,reqGetCode,userLogin,userLogout,reqTokenGetUserInfo} from "@/api"
const state={
  userTempId:getUserTempId(),
  code:'',//获取到的验证码
  // userInfo:{} //用户登录以后保存的用户信息,第一种用法  不好
  // userInfo:JSON.parse(localStorage.getItem('USERINFO_KEY')) || {},
  token:localStorage.getItem('TOKEN_KEY') || '',
  userInfo:{}
}
const mutations={
  RECEIVETOKEN(state,token){
    state.token = token;
  },
  RECIVECODE(state,code){
    state.code = code;
  },
  RECEIVEUSERLOGIN(state,userInfo){
    state.userInfo = userInfo;
  },
  RECEIVELOGOUT(state){
    state.userInfo = {}
    state.token = ''
  },
}
const actions={
   // 获取用户验证码的函数
   async getCode({commit},phone){
    let result = await reqGetCode(phone);
    if(result.code ===200){
      commit('RECIVECODE',result.data)
      return result.data
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户请求注册的函数
  async userRegister({commit},userInfo){
    let result = await reqUserRegister(userInfo);
    if(result.code ===200){
      return "ok"
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  // 用户登录
  async userLogin({commit},userInfo){
    let result = await userLogin(userInfo);
    if(result.code===200){
      // commit('RECEIVEUSERLOGIN',result.data)
      // 用户自动登录
      // localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))

      commit('RECEIVETOKEN',result.data.token);
      localStorage.setItem('TOKEN_KEY',result.data.token);

      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },

  // 获取用户信息
  async tokenGetUserInfo({commit}){
    let result = await reqTokenGetUserInfo();
    if(result.code==200){
      commit('RECEIVEUSERLOGIN',result.data)
      return 'ok'
    }else{
      //校验失败了，代表token失效了
      commit('RECEIVELOGOUT')
      localStorage.removeItem('TOKEN_KEY') 

      return Promise.reject(new Error('fail'))
    }
  },


  // 用户退出登录的函数
  async userLogout({commit}){
    let result = await userLogout()
    if(result.code===200){
      // commit('RECEIVELOGOUT')
      // // 清除local
      // localStorage.removeItem('USERINFO_KEY')
      commit('RECEIVELOGOUT');
      localStorage.removeItem('TOKEN_KEY') 
      return 'ok' 
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}
const getters={}

export default {
  state,
  mutations,
  actions,
  getters
}