const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenModel = require('../db/token')


router.post('/', function (req, res) {
    var token = req.body.token
    tokenModel.findOne({
        token
    }, (err, ts) => {
        if (ts) {
            try {
                var decode = jwt.verify(token, 'secret');
            } catch (error) {
                res.json({
                    status: 'fail',
                    msg: "登录过期",
                    data: error
                })
            }
            if (decode) {
                res.json({
                    status: 'success',
                    msg: "查询成功",
                    data: decode
                })
            } else {
                res.json({
                    status: 'fail',
                    msg: "登录过期",
                    data: ''
                })
            }
        } else {
            res.json({
                status: 'fail',
                msg: "登录失效",
                data: ''
            })
        }
    })
})

module.exports = router