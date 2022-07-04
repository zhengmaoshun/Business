import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location,resolved,rejected) {
  if(resolved===undefined && rejected===undefined){
    return originPush.call(this,location).catch(()=>{})
  }else{
    return originPush.call(this,location,resolved,rejected)
  }
}

VueRouter.prototype.replace = function (location,resolved,rejected) {
  if(resolved===undefined && rejected===undefined){
    return originReplace.call(this,location).catch(()=>{})
  }else{
    return originReplace.call(this,location,resolved,rejected)
  }
}

const router = new VueRouter({
  mode:'history',
  routes,
  // 切换路由的时候保证跳转到的页面滚动位置在最上方
  scrollBehavior (to, from, savedPosition) {
    return {x:0, y:0}
  }
})

 // 全局前置守卫
// router.beforeEach((to,from,next)=>{
//   let targetPath = to.path;
//   if(targetPath.indexOf('/trade')!==-1 ||targetPath.startsWith('/center') || targetPath.startsWith('/pay')){
//     if(store.state.Users.userInfo.name){
//       next()
//     }else{
//       alert('请先登录')
//       next('/login?redirect='+targetPath)
//     }
//   }else{
//     next()
//   }
// })

  router.beforeEach(async (to,from,next)=>{
    let userInfo = store.state.Users.userInfo;
    let token = store.state.Users.token;
    if(userInfo.name){
      next()
    }else{
      if(token){
        if(to.path=='/login'){
          next('/')
        }else{
          try {
            await store.dispatch('tokenGetUserInfo');
            next()
          } catch (error) {
            next('/login?redirect='+ to.path)
          }
        }
      }else{
        if(to.path.indexOf('/trade')!==-1 ||to.path.startsWith('/center') || to.path.startsWith('/pay')){
          alert('请先登录')
          next('/login?redirect='+to.path)
        }else{
          next()
        }
      }
    }
  })

export default router