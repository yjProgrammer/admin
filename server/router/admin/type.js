const express = require('express');
const router = express.Router();

const typeModel = require('../../db/typeModel')

router.post('/add', function (req, res) {
    typeModel.find({
        type: req.body.newtype
    }, function (err, suc) {
        if (err) {
            res.json({
                status: 'fail',
                msg: '添加失败'
            })
        } else {
            if (suc.length > 0) {
                res.json({
                    status: 'fail',
                    msg: '该类型已经添加'
                })
            } else {
                let type = new typeModel({
                    type: req.body.newtype
                })

                type.save(function (err, ty) {
                    if (err) {
                        res.json({
                            status: 'fail',
                            msg: '添加失败'
                        })
                    } else {
                        res.json({
                            status: 'success',
                            msg: '添加成功'
                        })
                    }
                })
            }
        }
    })

})

router.post('/get', function(req, res) {
    typeModel.find(function(err, types) {
        if(err) {
            res.json({
                status: 'fail',
                msg: '查询类型失败'
            })
        } else {
            res.json({
                status: 'success',
                msg: '查询类型成功',
                data: types
            })
        }
    })
})

router.post('/del', function(req, res) {
    typeModel.findOneAndDelete({type: req.body.type}, function(err, suc) {
        if(err) {
            res.json({
                status: 'fail',
                msg: '删除失败'
            })
        } else {
            res.json({
                status: 'success',
                msg: '删除成功'
            })
        }
    })
})

module.exports = router