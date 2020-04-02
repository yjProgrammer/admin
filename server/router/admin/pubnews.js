const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')

const newsModel = require('../../db/newsModel')


// 文件处理
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public', 'avatar'))
    },
    filename: function (req, file, cb) {
        var arr = file.originalname.split('.')
        cb(null, Date.now() + '.' + arr[arr.length - 1])
    }
})
var upload = multer({
    storage: storage
})

router.post('/avatar', upload.single('avatar'), function (req, res) {
    res.json({
        imgurl: req.file.filename
    })
})

router.post('/detail', function (req, res) {
    let news = newsModel({
        title: req.body.title,
        content: req.body.content,
        pubtime: req.body.pubtime,
        picture: req.body.picture,
        media: req.body.media,
        source: req.body.source,
        type: req.body.type
    })
    news.save(function (err, suc) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '发布失败'
            })
        } else {
            res.json({
                status: 'success',
                msg: '发布成功'
            })
        }
    })
})

router.post('/edit', function (req, res) {
    newsModel.findOneAndUpdate({
        _id: req.body._id
    }, req.body, function (err, suc) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '修改失败'
            })
        } else {
            if(suc) {
                res.json({
                    status: 'suc',
                    msg: '修改成功'
                })
            } else {
                res.json({
                    status: 'fail',
                    msg: '修改失败'
                })
            }
        }
    })
})


module.exports = router