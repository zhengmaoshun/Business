<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- <div class="cart-body" v-for="(cart,index) in shopCartList" :key="index"> -->
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartInfo,index) in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" @click="updateOne(cartInfo)" name="chk_list" :checked="cartInfo.isChecked === 1" />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{cartInfo.skuName}}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum('mins',cartInfo,-1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('change',cartInfo,$event.target.value*1)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeNum('plus',cartInfo,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cartInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isSelectAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
 
  name: "ShopCart",
  data() {
    return {};
  },
  mounted(){
    this.getShopCartList()
  },
  methods:{
    getShopCartList(){
      this.$store.dispatch('getShopCartList')
    },
    // 修改购物车中的每个商品的数量
    async changeNum(type,cartInfo,distNum){
      switch (type) {
        case 'mins':
          // 进行判断 如果数量大于1 才能减
          if(cartInfo.skuNum>1){
            distNum = -1;
          }else{
            distNum = 0
          }
          break;
        case "plus":
          distNum = 1;
          break;
        case "change":
          // 如果输入的是非法字符串或者负数的情况
          if(isNaN(distNum)|| distNum<1){
            distNum =0
          }else{ //输入的是正常情况，但是输入的是小数
            distNum = parseInt(distNum) - cartInfo.skuNum;
          }
          break;
        default:
          break;
      }
      try {
        let result = await this.$store.dispatch('addOrUpdateCart',{skuId:cartInfo.skuId,skuNum:distNum});
        if(result==='ok'){
          alert("修改购物车商品数据成功")
          this.getShopCartList()
        }else{
          alert('修改购物车商品数据失败')
        }
      } catch (error) {
        alert('修改购物车商品数据失败'+error.message)
      }
      // console.log("传给服务器的值",type,distNum)
    },
    // 修改购物车单个选中状态
    async updateOne(cartInfo){
      try {
        let result = await this.$store.dispatch('getUpdateCartIsCheck',{skuId:cartInfo.skuId,isChecked:cartInfo.isChecked==1?0:1})
        if(result==='ok'){
          alert("修改成功");
          this.getShopCartList()
        }else{
          alert("修改状态失败");
        }
      } catch (error) {
        alert("修改状态失败");
      }
    },
    // 删除选中的购物车数据(单个)
    async deleteOne(cartInfo){
      try {
        const result = await this.$store.dispatch("getDeleteOne",cartInfo.skuId)
        if(result==='ok'){
          alert("删除数据成功");
          this.getShopCartList()
        }else{
          alert('删除数据失败')
        }
      } catch (error) {
        alert('删除数据失败')
      }
    },
    // 删除选中的购物车数据(全部)
    async deleteAll(){
      try {
        await this.$store.dispatch("getDeleteAll");
        alert('删除全选数据成功')
        this.getShopCartList()
      } catch (error) {
        alert('删除全选数据失败'+error.message)
      }
    }
  },
  computed: {
    // ...mapState({
    //   shopCartList:state=>state.ShopCart.shopCartList
    // }),
    ...mapGetters(['shopCartInfo']),
    // 再次进行计算,取出cartInfoList
    cartInfoList(){
      return this.shopCartInfo.cartInfoList || []
    },
    // 计算选择了几件商品
    checkedNum(){
      return this.cartInfoList.reduce((prev,item,index,array)=>{
        if(item.isChecked===1){
          prev+=item.skuNum
        }
        return prev
      },0)
    },
    // 计算总价
    allMoney(){
      return this.cartInfoList.reduce((prev,item,index,array)=>{
        if(item.isChecked===1){
          prev+=item.skuNum * item.skuPrice
        }
        return prev
      },0)
    },
    // 计算全选数据
    isSelectAll:{
      get(){
        return this.cartInfoList.every(item=>item.isChecked===1) && this.cartInfoList.length>0
      },
      async set(val){
        // console.log(val);
        try {
          await this.$store.dispatch('getUpdateCartAll',val?1:0)
          alert('修改全选成功')
          this.getShopCartList();
        } catch (error) {
          alert('修改全选失败')
        }
      }
    },
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>