import Vue from 'vue'
import Vuex from 'vuex'
import Home from './Home'
import Users from './Users'
import Search from './Search'
import Detail from "./Detail"
import ShopCart from "./ShopCart"
import Trade from "./Trade"

Vue.use(Vuex);

const state={}
const mutations={}
const actions={}
const getters={}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    Home,
    Users,
    Search,
    Detail,
    ShopCart,
    Trade
  }
})