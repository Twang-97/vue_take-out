/* 
    能发送ajax的函数，函数的返回值是promise
    1.请求拦截器：
        a.处理post请求体参数格式，转化为urlencode格式，默认是json格式
        b.如果需要携带token的请求，从state中取出token
            1)如果没有token，直接进入失败的流程
            2）如果有token，添加到请求头中：Authorization=token
    2.响应拦截器：
        成功回调：让成功的结果不是response，而是response.data
        失败回调：统一处理错误
*/

import axios from 'axios'
import qs from 'qs'
import store from '../store';
import router from '../router';

import { Toast } from 'mint-ui';

// 请求拦截器
axios.interceptors.request.use(config => {
    const { method, data } = config
    if (method.toUpperCase() === 'POST' && data instanceof Object) {
        config.data = qs.stringify(data)
    }

    //如果需要携带token的请求，从state中取出token
    if (config.headers.needToken) {
        let token = store.state.user.token
        if (token) {
            //如果有token，添加到请求头中：Authorization = token
            config.headers.Authorization = token
        } else {
            //如果没有token，直接进入失败的流程
            const error = new Error('没有token，不能发送请求，请注册')
            error.status = 401
            throw error
        }
    }
    return config
})

//响应拦截器
axios.interceptors.response.use(response => {
    return response.data
}, error => {
    //发送请求前出错，没有token
    const { response, status, message } = error
    if (status === 401) {
        if (router.currentRoute.path != '/login') {
            //提示错误
            Toast(message)
            //跳转到登录页面
            router.replace('/login')
        }
    } else {
        const status = response.status
        //发送请求后出错，token过期
        if (status === 401) {
            if (router.currentRoute.path != '/login') {
                //提示错误信息
                Toast(response.data.message)
                //退出登录
                store.dispatch('logOut')
                //跳转到登录页面
                router.replace('/login')
            }
        } else if (status === 404) {//找不到请求资源
            Toast('找不到请求资源')
        } else {
            Toast('请求错误:' + message)
        }
    }

    return new Promise(() => { })
})

export default axios 