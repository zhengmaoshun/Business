import {reqUserAdressList,reqTradeInfo} from "@/api"
const state={
  userAdressList:[],
  tradeInfo:{}
}
const mutations={
  RECEIVETRADEINFO(state,tradeInfo){
    state.tradeInfo = tradeInfo
  },
  RECEIVEUSERADRESSINFO(state,userAdressList){
    state.userAdressList = userAdressList
  }
}
const actions={
  // 获取用户地址信息
  async getUserAdressInfo({commit}){
    let result = await reqUserAdressList()
    if(result.code ===200){
      commit('RECEIVEUSERADRESSINFO',result.data)
    }
  },
  // 获取用户商品清单数据
  async getTradeInfo({commit}){
    let result = await reqTradeInfo()
    if(result.code ===200){
      commit('RECEIVETRADEINFO',result.data)
    }
  }
}
const getters={
  detailArrayList(state){
    return state.tradeInfo.detailArrayList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}