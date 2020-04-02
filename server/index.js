const express = require('express') //引入express模块
const path = require('path') //引入path模块
const bodyParser = require('body-parser') //请求体解析中间件

const app = express()

//设置静态目录
app.use(express.static(path.join(__dirname, 'public')))

// 配置解析接收数据
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//允许跨域
app.use(
    function (req, res, next) {
        res.header({
            // 'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Origin': 'http://192.168.0.103',
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Methods': 'POST' //,GET,OPTIONS,PUT,DETELE
        })
        next()
    }
)


// 配置socket.io
// const server = require('http').createServer(app)
// const io = require('socket.io').listen(server)

// io.sockets.on('connection', function (socket) {
//     connections.push(socket)
//     console.log("user connected: %s online", connections.length)

//     socket.on('disconnect', function (data) {
//         connections.splice(connections.indexOf(socket), 1)
//         console.log("user disconnected: %s online", connections.length)
//     })

//     // socket.on('send message', function (data) {
//     //     io.sockets.emit('new message', {msg: data})
//     //     io.sockets.emit('get user', {msg: socket.id})
//     // })
// })

// app.get('/', function(req, res) {
//     console.log(req.body)
//     res.send('ok')
// })


//路由引用
const router = require('./router/index')
router(app)



app.listen(234, function() {
    console.log('running...')
}) //监听端口号