/*
    包含多个接口请求函数的模块
*/
import ajax from './ajax'

const BASE = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (latitude, longitude) => ajax.get(
    BASE + `/position/${latitude},${longitude}`
)

// 获取食品分类列表
export const reqCategorys = () => ajax.get(BASE + '/index_category', {
    headers: { needToken: true }
})

// 根据经纬度获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax({
    method: 'GET',
    url: BASE + '/shops',
    params: { latitude, longitude },
    headers: { needToken: true }
})

// 发送短信验证码
export const reqSendCode = (phone) => ajax.get(BASE + '/sendcode', {
    params: {
        phone
    }
})

// 用户名密码登陆
export const reqPswLogin = ({ name, pwd, captcha }) => ajax.post(BASE + '/login_pwd', {
    name,
    pwd,
    captcha
})

// 手机号验证码登陆
export const reqCodeLogin = (phone, code) => ajax.post(BASE + '/login_sms', {
    phone,
    code
})

// 自动登录
export const reqAutoLogin = () => ajax.get(BASE + '/auto_login', {
    headers: {
        needToken: true
    }
})

//获取商家信息
export const reqInfo = () => ajax('/info')

//获取商家评价数组
export const reqRatings = () => ajax('/ratings')

//获取商家商品数组
export const reqGoods = () => ajax('/goods')

//根据关键字搜索
export const reqSearch = (geohash, keyword) => ajax.get(BASE + '/search_shops', {
    geohash,
    keyword
})