import Vue from 'vue'
import App from './App'
import router from './router'
import { Button } from 'mint-ui';
import VueLazyload from 'vue-lazyload'


import Header from './components/Header/Header'
import CartControl from './components/CartControl/CartControl.vue';
import Star from './components/Star/Star'
import store from './store'
import loading from '../public/css/images/a.gif';
import Splite from './components/Splite/Splite.vue';

import './mock/mock-server';

Vue.use(VueLazyload, { // 内部自定义了一个全局指令: lazy
    loading
})

Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Splite', Splite)

Vue.component(Button.name, Button)


Vue.prototype.$eventBus = new Vue()


Vue.config.productionTip = 'false'//去掉打印提示

new Vue({
    // render: createElement => createElement(App)
    render: h => h(App),
    router,
    store
}).$mount('#app')