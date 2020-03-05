// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'


//路由懒加载
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue';
import Goods from '../pages/Shop/Goods/Goods.vue';
import Ratings from '../pages/Shop/Ratings/Ratings.vue';
import Info from '../pages/Shop/Info/Info.vue';


import A from '../pages/test/A.vue';
import B from '../pages/test/B.vue';
import B1 from '../pages/test/B1.vue';
import B2 from '../pages/test/B2.vue';

import Main from '../pages/test-slot/Main.vue';




export default [
    {
        path: '/',
        redirect: '/msite',
    },
    {
        path: '/msite',
        component: Msite,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/shop',
        component: Shop,
        children: [
            {
                path: '/shop/goods',
                component: Goods
            },
            {
                path: '/shop/ratings',
                component: Ratings
            },
            {
                path: '/shop/info',
                component: Info
            },
            {
                path: '',
                redirect: '/shop/goods'
            }
        ],
    },
    {
        path: '/a',
        component: A
    },
    {
        path: '/b',
        component: B,
        children: [
            {
                path: '/b/b1',
                component: B1
            },
            {
                path: '/b/b2',
                component: B2
            },
        ]
    },
    {
        path: '/main',
        component: Main
    },

]