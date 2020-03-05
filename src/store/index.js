/* 
    vuex最核心的管理对象store
*/
import Vue from 'vue'
import Vuex from 'vuex'

import msite from './mudules/msite';
import shop from './mudules/shop';
import user from './mudules/user';
import search from './mudules/search';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    mutations,
    actions,
    getters,
    // 配置应用中所有的功能相关的配置
    modules: {
        msite: msite,
        user: user,
        shop: shop,
        search: search
    }
})


/*
    总state解构
    {
        msite:{},
        shop:{},
        user:{}
    }
*/