var mongoose = require('./connect');

var tokenSchema = mongoose.Schema({  //创建 schema
    token: String
},{collection:'token'})  //指定集合
var tokenModel = mongoose.model('token',tokenSchema);  //创建model


module.exports = tokenModel;