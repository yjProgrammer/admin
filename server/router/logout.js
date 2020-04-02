const express = require('express');
const router = express.Router();
const tokenModel = require('../db/token')


router.post('/', function (req, res) {
    var token = req.body.token
    tokenModel.findOneAndRemove({
        token
    }, (err, ts) => {
        if(err) {
            res.json({
                status: 'fail',
                msg: '退出失败'
            })
        } else {
            res.json({
                status: 'success',
                msg: '退出成功'
            })
        }
    })
})

module.exports = router