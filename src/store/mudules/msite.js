import {
    RECEIVE_ADDRESS,
    RECEIVE_Categorys,
    RECEIVE_Shops,
    // RECEIVE_USER,
    // RESET_USER
} from '../mutation-types'

import { reqAddress, reqCategorys, reqShops } from '../../api'


const state = {
    // 首页
    latitude: "40.10038",
    longitude: "116.36867",
    address: {},
    categorys: [],
    shops: [],
}

const actions = {
    async getAddress({ commit, state }) {
        const { latitude, longitude } = state
        const result = await reqAddress(latitude, longitude)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, address)
        }
    },

    async getCategorys({ commit }) {
        const result = await reqCategorys()
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_Categorys, categorys)
        }
    },

    async getShops({ commit, state }) {
        const { latitude, longitude } = state
        const result = await reqShops({ latitude, longitude })
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_Shops, shops)
        }
    }
}

const mutations = {
    [RECEIVE_ADDRESS](state, address) {
        state.address = address
    },
    [RECEIVE_Categorys](state, categorys) {
        state.categorys = categorys
    },
    [RECEIVE_Shops](state, shops) {
        state.shops = shops
    }
}

export default {
    state,
    actions,
    mutations
}
