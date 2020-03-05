import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store';


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

const toPpath = ['/a', '/b']

//全局前置守卫
router.beforeEach((to, from, next) => {
    if (toPpath.indexOf(to.path) != -1 && !store.state.user.user._id) {
        next('/login')
    }
    next()
})

export default router