const user_register = require('./user/register')
const user_login = require('./user/login')
const collection = require('./user/collections')
const search = require('./user/search')

const admin_register = require('./admin/register')
const admin_login = require('./admin/login')
const type = require('./admin/type')
const pubnews = require('./admin/pubnews')

const getnews = require('./admin/getnews')
const login_status = require('./status')
const logout = require('./logout')

module.exports = function(app) {
    // 管理和用户登录状态的共同接口
    app.use('/loginstatus', login_status)   //验证登录状态

    app.use('/getnews', getnews)   //获取文章接口

    app.use('/pubnews', pubnews) //发布文章接口

    app.use('/logout', logout)  //退出登录

    app.use('/type', type)   //类型管理接口

    // 用户使用部分接口
    app.use('/uregister', user_register)  //注册接口

    app.use('/ulogin', user_login)   //登录接口

    app.use('/collect', collection)   //收藏接口

    app.use('/search', search)   //搜索接口

    // 管理后台部分接口
    app.use('/aregister', admin_register)   //注册接口
    
    app.use('/alogin', admin_login)  //登录接口

    // app.use('/getnews', getnews)   //爬取文章接口
}