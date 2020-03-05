import {
    SEARCH_SHOPS
} from '../mutation-types'

import { reqSearch } from '../../api'

import msite from './msite';


const state = {
    searchShop: {}
}

const actions = {
    async searchShop({ commit }, keyword) {
        const geohash = msite.state.latitude + ',' + msite.state.longitude
        const result = await reqSearch(geohash, keyword)
        if (result.code === 0) {
            const searchShop = result.data
            commit(SEARCH_SHOPS, { searchShop })
        }
    }
}

const mutations = {
    [SEARCH_SHOPS](state, { searchShop }) {
        state.searchShop = searchShop
    }
}

export default {
    state,
    actions,
    mutations
}
