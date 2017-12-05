/**
 * @Author:冯大双
 * @Date:2017/5/31
 * @Desc: 数据库连接信息
 */
// 引入mysql的node模块
var mysql = require('mysql');

// 创建数据数据库的连接信息
var mysqlConnection = mysql.createConnection({
    host: '192.168.10.90',
    user: 'admin',
    password: '123',
    port: '3306',
    database: 'dn-dev'
});

// 连接数据库
mysqlConnection.connect();
// console.log('连接成功');

// 执行sql语句,接受到返回的结果
mysqlConnection.query('select * from ex_teacher', function (err, rows) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }

    // 得到返回的数据json格式的对象
    var len = rows.length;
    for (var i = 0;i<len;i++){
        console.log(rows[i].user_name);
    }
})

// 关闭mysql数据库的连接
mysqlConnection.end();