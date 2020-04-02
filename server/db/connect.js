//数据库连接
const mongoose = require('mongoose')

const db = mongoose.connection

mongoose.connect('mongodb://localhost:27017/news', {
    useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('open')
});

module.exports = mongoose