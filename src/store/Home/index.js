import {reqCategroyList,reqBannerList,reqFloorList} from '@/api'
const state={
  categoryList:[],
  bannerList:[],
  floorList:[],
}
const mutations={
  RECEIVECATEGORY(state,categoryList){
    state.categoryList = categoryList
  },
  RECEIVEBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  RECEIVEFLOORLIST(state,floorList){
    state.floorList = floorList
  }
}
const actions={
  async getCategoryList(context){
    const result = await reqCategroyList()
    if(result.code===200){
      context.commit('RECEIVECATEGORY',result.data)
    }
  },
  async getBannerList(context){
    const result = await reqBannerList()
    if(result.code===200){
      context.commit('RECEIVEBANNERLIST',result.data)
    }
  },
  async getFloorList({commit}){
    const result = await reqFloorList()
    if(result.code===200){
      commit('RECEIVEFLOORLIST',result.data)
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