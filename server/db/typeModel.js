var mongoose = require('./connect');

var typeSchema = mongoose.Schema({  //创建 schema
    type: String
},{collection:'type'})  //指定集合
var typeModel = mongoose.model('type',typeSchema);  //创建model


module.exports = typeModel;