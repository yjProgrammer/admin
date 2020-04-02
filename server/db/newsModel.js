var mongoose = require('./connect');

var newsSchema = mongoose.Schema({  //创建 schema
    title:String,
    content: String,
    pubtime:String,
    picture: String,
    media:String,
    source:String,
    type: String
},{collection:'news'})  //指定集合
var newsModel = mongoose.model('news',newsSchema);  //创建model


module.exports = newsModel;