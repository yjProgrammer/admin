//创建用户模型
const mongoose = require('./connect')

const usersSchema = mongoose.Schema({
    uid: String,
    password: String,
    avatar: String
}, {collcetion: 'users'})

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;