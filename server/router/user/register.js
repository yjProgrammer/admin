const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const crytpo = require("crypto");

const usersModel = require('../../db/usersModel')
const tokenModel = require('../../db/token')

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


router.post('/', upload.single('avatar'), function (req, res) {
    if (req.body.username && req.body.password && req.file.filename) {
        var md5 = crytpo.createHash("md5");
        var md5Sum = md5.update(req.body.password);
        var password = md5Sum.digest('hex');

        var user = new usersModel({
            uid: req.body.username,
            password,
            avatar: req.file.filename
        })

        user.save((err, u) => {
            if (err) {
                res.json({
                    status: 'fail',
                    msg: "注册失败",
                    data: err
                })
            } else {
                res.json({
                    status: 'success',
                    msg: "注册成功",
                    data: u
                })
            }
        })
    } else {
        res.json({
            status: 'fail',
            msg: "注册失败",
            data: ''
        })
    }
})


router.post('/change', function(req, res) {
    usersModel.findById(req.body._id, function (err, suc) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '修改失败'
            })
        } else {
            let md5 = crytpo.createHash("md5");
            let md5Sum = md5.update(req.body.password);
            let password = md5Sum.digest('hex');
            if (req.body.username == suc.uid && password == suc.password) {
                let md52 = crytpo.createHash("md5");
                let md5Sum2 = md52.update(req.body.newpassword);
                let password2 = md5Sum2.digest('hex');
                usersModel.findByIdAndUpdate(req.body._id, {
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
                    msg: '账户名或密码错误'
                })
            }
        }
    })
})


module.exports = router