<template>
  <div class="pagination">
    <button
      :disabled="currentPageNum === 1"
      @click="$emit('changeNum', currentPageNum - 1)"
    >
      上一页
    </button>
    <button v-if="startEnd.start > 1" @click="$emit('changeNum', 1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <button
      :class="{ active: currentPageNum === page }"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changeNum', page)"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPageNum - 1">···</button>
    <button v-if="startEnd.end < totalPageNum" @click="$emit('changeNum', totalPageNum)">{{ totalPageNum }}</button>
    <button :disabled="currentPageNum === totalPageNum" @click="$emit('changeNum', currentPageNum+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNum: Number,
    pageSize: Number,
    total: {
      type: Number,
      default: 0,
    },
    continueNum: {
      type: Number,
      required: true,
    },
  },
  computed: {
    //计算总的页数，也就是总共分几页 (总页数 = 总条数/每页显示的条数)
    totalPageNum() {
      //向上取整，因为有可能算出来是小数
      return Math.ceil(this.total / this.pageSize);
    },
    //实时计算连续页的起始位置和结束位置
    startEnd() {
      let { currentPageNum, continueNum, totalPageNum } = this;
      let start, end, distNum;
      if (totalPageNum <= continueNum) {
        //如果我计算出来的总页数比连续页数小
        start = 1;
        end = totalPageNum;
      } else {
        //计算起始位置和结束位置，除去左右两端,下面两行是没问题的，但是左右两端有问题
        start = currentPageNum - Math.floor(continueNum / 2);
        end = currentPageNum + Math.floor(continueNum / 2);

        //修正左右两端的情况

        //第一种方法
        // if(start<1){
        //   start = 1;
        //   end = continueNum
        // }
        // if(end>totalPageNum){
        //   end = totalPageNum
        //   start = totalPageNum - continueNum
        // }

        //第二种方法 
        if (start < 1) {
          distNum = currentPageNum - start;
          start += distNum;
          end += distNum;
        }
        if (end > totalPageNum) {
          distNum = end - totalPageNum;
          start -= distNum;
          end -= distNum;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

