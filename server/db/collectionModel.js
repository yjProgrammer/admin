var mongoose = require('./connect');

var collectionSchema = mongoose.Schema({  //创建 schema
    uid: String,  
    aid:{type: mongoose.Schema.Types.ObjectId, ref: 'news'}
},{collection:'collections'})  //指定集合
var collectionModel = mongoose.model('collections',collectionSchema);  //创建model


module.exports = collectionModel;