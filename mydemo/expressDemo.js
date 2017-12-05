/**
 * @Author:冯大双
 * @Date:2017/5/26
 * @Desc: 请求demo
 */

// 引入express,mysql模块
var express = require("express");
var mysql = require('mysql');
var bodyParser = require('body-parser');
// 创建数据数据库的连接信息
var mysqlConnection = mysql.createConnection({
    host: '192.168.10.90',
    user: 'admin',
    password: '123',
    port: '3306',
    database: 'dn-dev'
});

// 连接数据库
// mysqlConnection.connect();

// 创建一个app对象,类似一个web的应用网站
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 解决跨越与问题
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 接受指定路径的请求,指定回调函数
app.post("/test", function (req, res) {

   //  console.info(req.body.html.val);
        res.send("success");
});

app.get("/node2", function (req, res) {

    // 获取请求路径带的参数
    var id = req.query.id;
    var name = req.query.name;
    res.send('id:' + id + '  name:' + name);
})

// 创建一个web服务器,可以任务就是web服务器对象
// 监听8090端口,当监听成功的时候回调.
var server = app.listen(8090, function () {
    var host = server.address().address;// 地址
    var port = server.address().port;//端口
    console.log('开始监听' + port + '端口');
})
