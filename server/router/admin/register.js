const express = require('express');
const router = express.Router();
const crytpo = require("crypto");
const adminerModel = require('../../db/adminerModel')
const tokenModel = require('../../db/token')


router.post('/', function (req, res) {
    //密码加密
    let md5 = crytpo.createHash("md5");
    let md5Sum = md5.update(req.body.password);
    let password = md5Sum.digest('hex');

    let adminer = new adminerModel({
        adid: req.body.adid,
        password
    })
    adminerModel.findOne({
        adid: req.body.adid
    }, function (errone, ad) {
        if (errone) {
            res.json({
                status: 'fail',
                msg: '注册失败'
            })
        } else {
            if (!ad) {
                adminer.save((errtwo, suc) => {
                    if (errtwo) {
                        res.json({
                            status: 'fail',
                            msg: '注册失败'
                        })
                    } else {
                        res.json({
                            status: 'success',
                            msg: '注册成功'
                        })
                    }
                })
            } else {
                res.json({
                    status: 'fail',
                    msg: '用户名已存在'
                })
            }
        }
    })
})

router.post('/change', function (req, res) {
    adminerModel.findById(req.body._id, function (err, suc) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '修改失败'
            })
        } else {
            let md5 = crytpo.createHash("md5");
            let md5Sum = md5.update(req.body.password);
            let password = md5Sum.digest('hex');
            if (req.body.adminer == suc.adid && password == suc.password) {
                let md52 = crytpo.createHash("md5");
                let md5Sum2 = md52.update(req.body.newpassword);
                let password2 = md5Sum2.digest('hex');
                adminerModel.findByIdAndUpdate(req.body._id, {
                    password: password2
                }, function (err1, suc1) {
                    if (err1) {
                        res.json({
                            status: 'fail',
                            msg: '修改失败'
                        })
                    } else {
                        tokenModel.findOneAndRemove({
                            token: req.body.token
                        }, function (err2, suc2) {
                            if (err2) {
                                res.json({
                                    status: 'fail',
                                    msg: '密码修改失败'
                                })
                            } else {
                                res.json({
                                    status: 'success',
                                    msg: '密码修改成功'
                                })
                            }
                        })
                    }
                })
            } else {
                res.json({
                    status: 'fail',
                    msg: '密码错误'
                })
            }
        }
    })
})

module.exports = router