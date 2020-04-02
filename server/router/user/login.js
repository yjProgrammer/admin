const express = require('express');
const router = express.Router();
const crytpo = require("crypto");
const jwt = require('jsonwebtoken');

const usersModel = require('../../db/usersModel')
const tokenModel = require('../../db/token')

router.post('/', function(req, res) {
    var uname = req.body.username;
    var pw =  req.body.password;
    if(uname && pw){
        var md5 = crytpo.createHash("md5"); 
        var md5Sum = md5.update(pw);    
        var password = md5Sum.digest('hex'); 

        usersModel.find({uid:uname,password:password},(err,us)=>{ 
            if(us.length>0){
                var userinfo = {
                    _id : us[0]._id,
                    username : us[0].uid,
                    avatar: us[0].avatar
                }
                var token = jwt.sign(
                    userinfo, 
                    'secret', 
                    { expiresIn: '7d' }
                )           
                var token2 =  new tokenModel({
                    token
                })
                token2.save((err,tt)=>{
                    res.json({
                        status:'success',
                        msg:"登录成功",
                        data:{
                            token,
                            userinfo
                        }
                    })
                })
            }else{
                res.json({
                    status:'fail',
                    msg:"用户名或密码错误",
                })
            }

        })
    }else{
        res.json({
            status:'fail',
            msg:"缺少参数",
        })
    }

})


module.exports = router