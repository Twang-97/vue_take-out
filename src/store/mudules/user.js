import {
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_TOKEN,
    RESET_TOKEN,
} from '../mutation-types'

import { reqAutoLogin } from '../../api'


const state = {
    // 用户
    user: {},//用户信息
    token: localStorage.getItem('token_key'),//保存token
}

const actions = {
    //保存登陆的用户信息
    saveUser({ commit }, user) {
        const token = user.token
        //保存tokenlocal中
        localStorage.setItem('token_key', token)
        //在state中保存token
        commit(RECEIVE_TOKEN, token)
        //将token单独存储，删除user中原有的token
        delete user.token
        commit(RECEIVE_USER, user)
    },


    //退出登录 清除保存的用户信息
    logOut({ commit }) {
        commit(RESET_USER)
        //删除local中的token
        localStorage.removeItem('token_key')
        //删除state中的token
        commit(RESET_TOKEN)
    },

    //自动登录
    async autoLogin({ commit, state }) {
        if (state.token) {
            const result = await reqAutoLogin()
            if (result.code === 0) {
                const user = result.data
                commit(RECEIVE_USER, user)
            }
        }
    }
}

const mutations = {
    [RECEIVE_TOKEN](state, token) {
        state.token = token
    },
    [RESET_TOKEN](state) {
        state.token = ''
    },
    [RECEIVE_USER](state, user) {
        state.user = user
    },
    [RESET_USER](state) {
        state.user = {}
    },
}




export default {
    state,
    actions,
    mutations,
}