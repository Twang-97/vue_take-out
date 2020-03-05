<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <li
            class="menu-item"
            :class="{ current: currentIndex === index }"
            v-for="(good, index) in goods"
            :key="good.name"
            @click="selectItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="food in good.foods"
                :key="food.name"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ShopCart />
    </div>
    <Food ref="food" :food="food" />
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { mapState } from "vuex";
import ShopCart from '../../../components/ShopCart/ShopCart'
import Food from '../../../components/Food/Food.vue'
export default {
  data(){
    return{
      scrollY:0, // 滑动的垂直距离
      tops:[], // 临界值数组
      food:{}
    }
  },
  mounted(){
    if(this.goods.length>0){
      this._initScroll()
      this._initTops()
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    //根据scrollY，找到tops数组中符合要求的索引值
    currentIndex(){
      const{scrollY,tops}=this
      const index=tops.findIndex((top,index)=>scrollY>=top&&scrollY<tops[index+1])
      //判断index的值是否发生了改变，如果发上改变，让左侧自动滑动到对应index的li上
      if(index!=this.index&&this.leftScroll){
        const li=this.$refs.leftUl.children[index]
        this.leftScroll.scrollToElement(li,100)
      }
      return index
    }
  },
  watch:{
    goods(){
      this.$nextTick(()=>{
        this._initScroll()
        this._initTops()
      })
    }
  },
  methods:{
    _initScroll(){
      this.leftScroll=new BScroll(this.$refs.left,{
        click:true
      })
      this.rightScroll=new BScroll(this.$refs.right,{
        /*
          设置probeType才会触发scroll事件
          1：触摸滑动 非实时 2：触摸滑动 实时3：触摸滑动/惯性滑动/编码滑动 实时
        */
        probeType:1,
        click:true
      })
      //绑定scroll事件
      this.rightScroll.on('scroll',({y})=>{
        this.scrollY=Math.abs(y)
      })
      //probeType为1时，设置一个滚动结束的回调函数，保证惯性滑动后可以执行此函数
      this.rightScroll.on('scrollEnd',({y})=>{
        this.scrollY=Math.abs(y)
      })
    },

    //将临界值存入tops数组中
    _initTops(){
      const tops=[]
      let top=0
      tops.push(top)
      const lis=this.$refs.rightUl.children
      Array.prototype.forEach.call(lis,li=>{
        top+=li.clientHeight
        tops.push(top)
      })
      this.tops=tops
    },

    //点击左侧li，实现右侧自动滑动
    selectItem(index){
      const top=this.tops[index]
      //因为probeType为1，所以要编码立即更新scrollY的值
      this.scrollY=top
      this.rightScroll.scrollTo(0,-top,500)
    },

    showFood(food){
      this.food=food
      this.$refs.food.taggleShow()
    }
  },
  components:{
    ShopCart,
    Food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';
.goods {
  display: flex;
  position: absolute;
  top: 225px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
