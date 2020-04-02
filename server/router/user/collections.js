const express = require('express');
const router = express.Router();
const collectionModel = require('../../db/collectionModel')

router.post('/', function (req, res) {
    let collection = new collectionModel({
        uid: req.body.uid,
        aid: req.body.aid
    })
    collection.save(function (err, col) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '收藏失败'
            })
        } else {
            res.json({
                status: 'success',
                msg: '收藏成功',
                data: col
            })
        }
    })
})

router.post('/colstatus', function (req, res) {
    console.log(req.body.uid)
    console.log(req.body.aid)
    collectionModel.find({
        uid: req.body.uid,
        aid: req.body.aid
    }, function (err, col) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '收藏查询失败'
            })
        } else {
            console.log(col)
            console.log('-----')
            console.log(col.length)
            if (col.length < 1) {
                res.json({
                    status: 'fail',
                    msg: '未收藏'
                })
            } else {
                res.json({
                    status: 'success',
                    msg: '已收藏'
                })
            }
        }
    })
})

router.post('/cancle', function (req, res) {
    collectionModel.findOneAndRemove({
        uid: req.body.uid,
        aid: req.body.aid
    }, function (err, suc) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '取消收藏失败'
            })
        } else {
            res.json({
                status: 'success',
                msg: '已取消收藏'
            })
        }
    })
})

router.post('/clist', function (req, res) {
    collectionModel.find({
        uid: req.body.uid
    }).populate('aid', '_id title pubtime picture media source type content').exec(function (err, clist) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '查询失败',
                data: err
            })
        } else {
            res.json({
                status: 'success',
                msg: '查询成功',
                data: clist
            })
        }
    })
})

module.exports = router