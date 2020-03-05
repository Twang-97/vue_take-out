<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cArr, index) in categorysArr2" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in cArr" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url" />
              </div>
              <span>{{ c.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <Shops></Shops>
  </section>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
import Swiper from "swiper";
import "swiper/css/swiper.css";

import chunk from "lodash/chunk";
import Shops from "../../components/Shops/Shops";

/*
   列表页面显示以后在创建swiper
   解决创建swiper对象后不能正常轮播
   Vue更新流程： 更新状态数据 ==> 立即同步调用监视的回调函数 ==> 异步更新界面
   1.watch+$nextTick()
      watch: {
        categorys() {
          this.$nextTick(() => {
            new Swiper(".swiper-container", {
              loop: true,
              pagination: {
                el: ".swiper-pagination"
              }
            });
          });
        }
      }
   2.dispatch+$nextTick()
    dispatch第二个参数传递callback，action中在commit后执行回调函数，因为commit后会更新state，在commit后执行
    相当于添加了一个watch
      this.$store.dispatch("getCategorys", () => {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true,
            pagination: {
              el: ".swiper-pagination"
            }
          });
        });
    });

    async getCategorys({ commit }, callback) {
        const result = await reqCategorys()
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_Categorys, categorys)
            typeof callback === 'function' && callback()
        }
    },


   3.利用dispatch返回的是一个promise，返回的promise在状态更新且界面更新之后才成功
      async mounted() {
      this.$store.dispatch("getShops");
      await this.$store.dispatch("getCategorys");
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }

*/

/*
  swiper数据分组，一维数组变成二维数组
  1. categorysArr() {
      const { categorys } = this;
      let bigArr = [];
      let smallArr = [];

      //遍历categorys的每一项，每八个为一个小数组，并添加到大数组中，最终变成二维数组
      categorys.forEach(c => {
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }
        smallArr.push(c);
        if (smallArr.length === 8) {
          smallArr = [];
        }
      });
      return bigArr;
    }
  2.lodash中有封装好的chunk
    import chunk from "lodash/chunk";
    categorysArr2() {
      return chunk(this.categorys, 8);
    }
  }
*/

export default {
  async mounted() {
    this.$store.dispatch("getShops");
    await this.$store.dispatch("getCategorys");
    new Swiper(".swiper-container", {
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  computed: {
    // ...mapState(["address", "categorys"]),
    ...mapState({
      address: state => state.msite.address,
      categorys: state => state.msite.categorys
    }),
    categorysArr() {
      const { categorys } = this;
      let bigArr = [];
      let smallArr = [];

      //遍历categorys的每一项，每八个为一个小数组，并添加到大数组中，最终变成二维数组
      categorys.forEach(c => {
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }
        smallArr.push(c);
        if (smallArr.length === 8) {
          smallArr = [];
        }
      });
      return bigArr;
    },
    categorysArr2() {
      return chunk(this.categorys, 8);
    }
  },
  components: {
    Shops
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>
