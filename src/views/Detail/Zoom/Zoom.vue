<template>
  <div class="spec-preview" >
    <img :src="defaultImg.imgUrl"/>
    <div class="event" @mousemove="moueIn"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    data(){
      return{
        defaultIndex:0
      }
    },
    mounted(){
      this.$bus.$on('changeIndex',this.changeIndex)
    },
    methods:{
      changeIndex(index){
        this.defaultIndex = index
      },
      // 鼠标移入事件
      moueIn(event){
        let mask = this.$refs.mask;
        let bigImg = this.$refs.bigImg;
        //计算鼠标移动的位置
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;
        //计算遮罩应该移动的位置
        let maskX = mouseX - mask.offsetWidth / 2;
        let maskY = mouseY - mask.offsetHeight / 2;
        // 左右边界进行计算判断
        if(maskX<0){
          maskX = 0;
        }else if(maskX>mask.offsetWidth){
          maskX = mask.offsetWidth
        }
        // 上下边界进行计算判断
        if(maskY<0){
          maskY = 0;
        }else if(maskY>mask.offsetHeight){
          maskY = mask.offsetHeight
        }
        //赋值给遮罩进行移动
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 赋值给大图
        bigImg.style.left = -2 * maskX + 'px';
        bigImg.style.top = -2 * maskY + 'px';
      }
    },
    computed:{
      //计算defaultImg是为了去除假错
      defaultImg(){
        return this.imgList[this.defaultIndex] || {}
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;
      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>