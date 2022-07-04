import { reqAddOrUpdateShopCart,reqShopCartList,reqUpdateCartIsCheck,reqDeleteCart } from "@/api";
const state={
  shopCartList:[],
  // cartInfoList:[],
}
const mutations={
  RECEIVESHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList;
    // state.cartInfoList = shopCartList[0].cartInfoList;
  },
}
const actions={
  async addOrUpdateCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code===200){
      return "ok"
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  //获取购物车列表数据
  async getShopCartList({commit}){
    const result = await reqShopCartList()
    if(result.code===200){
      commit('RECEIVESHOPCARTLIST',result.data)
    }
  },
  // 修改购物车单个选中状态
  async getUpdateCartIsCheck({commit},{skuId,isChecked}){
    let result = await reqUpdateCartIsCheck(skuId,isChecked)
    if(result.code===200){
      return "ok"
    }else{
      return Promise.reject(new Error("fail"))
    }
  },

  // 修改购物车全选的状态（因为没有全选的接口,点击全选的时候需要一个一个的修改选中的状态）
  async getUpdateCartAll({commit,state,dispatch},isChecked){
    let promises = []; //用来保存每次调用接口返回数据的数组
    state.shopCartList[0].cartInfoList.forEach(item=>{
      if(item.isChecked==isChecked) return
      let promiseis = dispatch('getUpdateCartIsCheck',{skuId:item.skuId,isChecked})
      promises.push(promiseis)
    })
    return Promise.all(promises)
  },

  // 删除购物车数据(单个)
  async getDeleteOne({commit},skuId){
    let result = await reqDeleteCart(skuId);
    if(result.code===200){
      return "ok"
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除购物车数据(删除全选中的)
  async getDeleteAll({commit,state,dispatch}){
    let promises=[]
    state.shopCartList[0].cartInfoList.forEach(item=>{
      if(!item.isChecked) return
      let promiseis = dispatch('getDeleteOne',item.skuId)
      promises.push(promiseis)
    })
    return Promise.all(promises)
  }


}
const getters={
  shopCartInfo(state){
    return state.shopCartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}