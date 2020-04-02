var mongoose = require('./connect');

var adminerSchema = mongoose.Schema({  //创建 schema
    adid: String,
    password: String
},{collection:'adminer'})  //指定集合
var adminerModel = mongoose.model('adminer',adminerSchema);  //创建model


module.exports = adminerModel;