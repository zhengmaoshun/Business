import ajax from '@/ajax/ajax.js'
import mockAjax from '@/ajax/mockAjax.js'

//获取三级分类列表
export const reqCategroyList = ()=>{
  return ajax({
    url:"/product/getBaseCategoryList",
    method:'get'
  })
}

//获取首页轮播图列表
export const reqBannerList = ()=>{
  return mockAjax({
    url:'/banner',
    method:'get'
  })
}

//获取首页楼层列表

export const reqFloorList = ()=>{
  return mockAjax({
    url:'/floor',
    method:"get"
  })
}

//获取搜索列表
export const reqGoodsListInfo = (searchParams)=>{
  return ajax({
    url:"/list",
    method:"post",
    data:searchParams
  })
}
//获取商品详情
export const reqGoodsDetailInfo = (skuId)=>{
  return ajax({
    url:`/item/${skuId}`,
    method:'get'
  })
}
//添加购物车和修改购物车数量功能
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
  return ajax({
    url:`/cart/addToCart/${ skuId }/${ skuNum }`,
    method:"post"
  })
}

//获取购物车列表
export const reqShopCartList = ()=>{
  return ajax({
    url:'/cart/cartList',
    method: 'get',
  })
}

// 修改购物车单个选中状态
export const reqUpdateCartIsCheck = (skuId,isChecked)=>{
  return ajax({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
  })
}

// 删除购物车数据 单个
export const reqDeleteCart = (skuId)=>{
  return ajax({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
  })
}

// 用户注册的请求接口
export const reqUserRegister = (userInfo)=>{
  return ajax({
    url:'/user/passport/register',
    method:'post',
    data:userInfo
  })
}

// 用户获取验证码的接口
export const reqGetCode = (phone)=>{
  return ajax({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
  })
}

// 用户登录的接口
export const userLogin = (userInfo)=>{
  return ajax({
    url:"/user/passport/login",
    method:'post',
    data:userInfo
  })
}

// 用户退出登录的接口
export const userLogout = ()=>{
  return ajax({
    url:"/user/passport/logout",
    method:'get'
  })
}

//获取用户地址信息
export const reqUserAdressList = ()=>{
  return ajax({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get',
  })
}

// 获取用户商品清单数据
export const reqTradeInfo = ()=>{
  return ajax({
    url:'/order/auth/trade',
    methods:'get'
  })
}

/// 请求创建订单（点击提交按钮就会）
// /api/order/auth/submitOrder?tradeNo={tradeNo}
// POST
// 参数  交易编号是query  其余是请求体data

export const reqSubmitOrder = (tradeNo,tradeInfo)=>{
  return ajax({
    url:"/order/auth/submitOrder",
    method: 'post',
    params:{
      tradeNo:tradeNo
    },
    data:tradeInfo
  })
}

// 获取订单交易金额以及微信二维码链接
export const reqOrderInfo = (orderId)=>{
  return ajax({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
  })
}

// 查询订单支付状态
export const reqPayStatus = (orderId)=>{
  return ajax({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}

//请求获取我的订单数据
///api/order/auth/{page}/{limit}
//get

export const reqMyOrderInfo = (page,limit) => {
  return ajax({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}

//根据token获取真正的用户信息
// /api/user/passport/auth/getUserInfo
// get

export const reqTokenGetUserInfo = () => {
  return ajax({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
  })
}

