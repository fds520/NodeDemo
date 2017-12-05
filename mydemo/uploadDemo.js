/**
 * @Author:冯大双
 * @Date:2017/6/1
 * @Desc:
 */

// 引入express 模块和文件上传模块
var express = require("express");
var mutipart = require("connect-multiparty");
var mutipartMiddeware = mutipart();
var app = express();
// 编写文件上传地址
app.use(mutipart({uploadDir: 'D:/Temp/images'}));
app.post('/upload', mutipartMiddeware, function (req, res) {
    console.log(req.files);
    res.send('upload success!');
})

app.post('/temp', function (req, res) {
    res.send('测试端口');
})
var server = app.listen(8088, function () {
    var host = server.address().address;// 地址
    var port = server.address().port;//端口
    console.log('开始监听' + port + '端口');
})