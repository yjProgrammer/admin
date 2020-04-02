const express = require('express')
const newsModel = require('../../db/newsModel')

const router = express.Router()

router.post('/',function(req, res) {
    var keyword = req.body.keyword;
    var size = req.body.size? parseInt(req.body.size):20;
    var page = req.body.page?parseInt(req.body.page):1;
       
    if(keyword){
        newsModel.find({title:{$regex : new RegExp(keyword,'ig')}},'_id title pubtime picture media type content').limit(size).skip(size*(page-1)).exec((err,ns)=>{        
            if(err){
                res.json({
                    status:'fail',
                    msg:'查询失败',
                    data:''
                })
            }else{
                res.json({
                    status:'success',
                    msg:'查询成功',
                    data:ns
                })
            }          
        })   
    }
})

module.exports = router
