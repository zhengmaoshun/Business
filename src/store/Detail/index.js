import {reqGoodsDetailInfo} from "@/api"
const state={
  goodsDetailInfo:{}
}
const mutations={
  RECEIVEGOODSDETAILINFO(state,goodsDetailInfo){
    state.goodsDetailInfo = goodsDetailInfo
  }
}
const actions={
  async getGoodsDetailInfo({commit},skuId){
    let result = await reqGoodsDetailInfo(skuId)
    if(result.code===200){
      commit('RECEIVEGOODSDETAILINFO',result.data)
    }
  }
}
const getters={
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}