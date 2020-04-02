const express = require('express');
const router = express.Router();
const crytpo = require("crypto");
const jwt = require('jsonwebtoken');

const tokenModel = require('../../db/token')
const adminerModel = require('../../db/adminerModel')

router.post('/', function (req, res) {
    let md5 = crytpo.createHash("md5");
    let md5Sum = md5.update(req.body.password);
    let password = md5Sum.digest('hex');
    
    adminerModel.find({
        adid: req.body.adid,
        password
    }, function (err, ad) {
        if (ad.length <= 0) {
            res.json({
                status: 'fail',
                msg: "用户名或者密码错误"
            })
        } else {
            var adminerinfo = {
                _id: ad[0]._id,
                username: ad[0].adid
            }

            var token = jwt.sign(
                adminerinfo,
                'secret', {
                    expiresIn: '7d'
                }
            )

            var tokens = new tokenModel({
                token
            })

            tokens.save((err, suc) => {
                res.json({
                    status: 'success',
                    msg: "登录成功",
                    data: {
                        token,
                        adminerinfo
                    }
                })
            })
        }
    })
})


module.exports = router