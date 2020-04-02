const express = require('express')
const axios = require('axios')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')

const newsModel = require('../../db/newsModel')

const router = express.Router()

// 获取腾讯财经新闻接口
router.get('/finance', function (req, resp) {
    axios({
        url: 'https://new.qq.com/ch/finance/',
        method: 'get',
        responseType: 'arraybuffer'
    }).then(res => {
        let html = iconv.decode(res.data, 'gb2312')
        let $ = cheerio.load(html, {
            decodeEntities: false
        })

        let list = $('.list li')
        for (let i = 0; i < list.length; i++) {
            let newhref = $('.list li').eq(i).find('a').attr('href')
            axios({
                url: newhref,
                method: 'get',
                responseType: 'arraybuffer'
            }).then(res => {
                //将buffer转换成文字
                let html = iconv.decode(res.data, 'gb2312')
                let $1 = cheerio.load(html, {
                    decodeEntities: false
                })


                // 新闻标题以及内容
                let title = $1('.LEFT h1').html()
                let content = $1('.content-article').html()

                // 新闻时间
                let pubtime
                let info = $1('script').eq(5).html()
                let info2 = info.split('=')
                let obj = JSON.parse(info2[1])
                let oldtime = obj.pubtime
                let dd = new Date(oldtime)
                pubtime = dd.getTime()

                //图片处理
                let imgs = $1('.content-picture')
                let picture
                if (imgs < 0) {
                    picture = null
                } else {
                    let purl = $1('.content-picture').eq(0).attr('src')
                    picture = purl != undefined ? 'https:' + purl : null
                }

                //媒体
                let media
                media = obj.media

                // 新闻来源和类型
                let source = newhref
                let type = '财经'

                // 建立数据库模型
                let news = newsModel({
                    title,
                    content,
                    pubtime,
                    picture,
                    media,
                    source,
                    type
                })

                // // 存入数据库
                news.save((err, news) => {
                    if (err) {
                        console.log('保存失败')
                    } else {
                        console.log(i + ':保存成功')
                    }
                })

            })
        }
    })
})


// 获取搜狐体育新闻接口
router.get('/military', function (req, resp) {
    axios({
        url: 'https://sports.sohu.com/',
        method: 'get'
    }).then(res => {
        let $ = cheerio.load(res.data, {
            decodeEntities: false
        })

        let list = $('.s-one_center .z-head-line p')
        for (let i = 0; i < list.length; i++) {
            // 新闻标题
            let title = list.eq(i).find('a').text()

            // 新闻链接
            let newhref = list.eq(i).find('a').attr('href')
            if (!/https/g.test(newhref)) {
                newhref = 'https:' + newhref
            }
            axios({
                url: newhref,
                method: 'get'
            }).then(res => {
                let $1 = cheerio.load(res.data, {
                    decodeEntities: false
                })

                // 新闻内容
                let content = $1('.article').html()

                // 时间处理
                let pubtime
                let time = $1('#news-time').html()
                if (time) {
                    pubtime = new Date(time.replace(/-/g, '/')).getTime() //日期转换成时间戳
                } else {
                    pubtime = Date.parse(new Date())
                }

                // 图片处理
                let imgs = $1('.article img')
                let picture
                if (imgs < 0) {
                    picture = null
                } else {
                    let purl = $1('.article img').eq(0).attr('src')
                    picture = purl != undefined ? purl : null
                }

                // 新闻媒体
                let media = $1('.user-info h4 a').text()
                if (!media) {
                    media = '搜狐'
                }

                // 新闻来源和类型
                let source = newhref
                let type = '体育'

                // 建立数据库模型
                if (content) {
                    let news = newsModel({
                        title,
                        content,
                        pubtime,
                        picture,
                        media,
                        source,
                        type
                    })

                    // // 存入数据库
                    news.save((err, news) => {
                        if (err) {
                            console.log('保存失败')
                        } else {
                            console.log(i + ':保存成功')
                        }
                    })
                }

            })
        }
    })
})


router.post('/', function (req, resp) {
    newsModel.find().limit(10).skip(10 * (req.body.page - 1)).sort({
        "_id": -1
    }).exec(function (err, news) {
        if (err) {
            resp.json({
                status: 'fail',
                msg: '获取文章列表失败'
            })
        } else {
            resp.json({
                status: 'success',
                msg: '获取文章列表成功',
                data: news
            })
        }
    })
})

router.post('/num', function (req, resp) {
    newsModel.find(function (err, news) {
        if (err) {
            resp.json({
                status: 'fail',
                msg: '获取文章列表失败'
            })
        } else {
            resp.json({
                status: 'success',
                msg: '获取文章列表成功',
                data: news.length
            })
        }
    })
})

router.post('/type', function (req, resp) {
    newsModel.find({
        type: req.body.type
    }).limit(10).exec(function (err, news) {
        if (err) {
            resp.json({
                status: 'fail',
                msg: '获取文章列表失败'
            })
        } else {
            resp.json({
                status: 'success',
                msg: '获取文章列表成功',
                data: news
            })
        }
    })
})

router.post('/id', function (req, resp) {
    if (req.body._id) {
        newsModel.find({
            _id: req.body._id
        }, function (err, news) {
            if (err) {
                resp.json({
                    status: 'fail',
                    msg: '获取文章失败'
                })
            } else {
                resp.json({
                    status: 'success',
                    msg: '获取文章成功',
                    data: news
                })
            }
        })
    } else {
        resp.json({
            status: 'fail',
            msg: '获取文章失败'
        })
    }
})

router.post('/del', function (req, resp) {
    newsModel.findByIdAndRemove(req.body._id, function (err, suc) {
        if (err) {
            resp.json({
                status: 'fail',
                msg: '删除失败'
            })
        } else {
            resp.json({
                status: 'success',
                msg: '删除成功'
            })
        }
    })
})

module.exports = router