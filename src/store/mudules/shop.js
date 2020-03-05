import Vue from 'vue';

import {
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT
} from '../mutation-types'


import { reqGoods, reqInfo, reqRatings } from '../../api'


const state = {
    // 商家
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
    cartFoods: [] //购物车food数组
}

const actions = {
    // 异步获取商家信息
    async getInfo({ commit }) {
        const result = await reqInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
        }
    },


    // 异步获取商家评价列表
    async getRatings({ commit }, callback) {
        const result = await reqRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            callback && callback()
        }
    },

    // 异步获取商家商品列表
    async getGoods({ commit }) {
        const result = await reqGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            // cb && cb()
        }
    },

    //更新商品数量
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(ADD_FOOD_COUNT, food)
        } else {
            commit(REDUCE_FOOD_COUNT, food)
        }
    }
}

const mutations = {
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },

    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },

    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [ADD_FOOD_COUNT](state, food) {
        if (food.count) {
            food.count++
        } else {
            Vue.set(food, 'count', 1)
            //添加food到cartFoods中
            state.cartFoods.push(food)
        }
    },
    [REDUCE_FOOD_COUNT](state, food) {
        if (food.count > 0) {
            food.count--
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    }
}

const getters = {
    //选中的添加到购物车的某个商品数量
    totalCount(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },

    //选中的添加到购物车的某个商品总价格
    totalPrice(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
    },



    positiveRatingsCount(state) {
        return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}