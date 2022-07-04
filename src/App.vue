<template>
  <div>
    <!-- 头部 -->
    <Header />
    <!-- 路由组件显示区域 -->
    <router-view></router-view>
    <!-- 底部 -->
    <Footer v-show="!$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: 'App',
  data(){  
    return{  

    }        
  },
  components:{
    Header,
    Footer
  },
  mounted(){
    this.getCategroyList();
  },
  methods:{
    getCategroyList() {
      this.$store.dispatch("getCategoryList");
    },
  }   
}
</script>

<style lang="less" scoped>

</style>
