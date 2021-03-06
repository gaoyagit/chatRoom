const express = require('express');
const app = require('express')();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
const querystring = require('querystring');
const util = require('util');
const fs = require('fs');
var router = express.Router();

app.use('/', router);
app.use(express.static('app'));

// 处理get请求
router.get('/geCookie', function (req, res) {
    const loginInfo = JSON.parse(fs.readFileSync('./config/userInfo.json', 'utf-8'));
    var reqInfo = req.param('userName');//解析用户名
    var cookieInfo = loginInfo[reqInfo];//找到该用户的所有信息
    res.send({
        'userName': cookieInfo.name,
        'userAvatar': cookieInfo.avatar
    });
});


// 在线用户信息
const onlineUsersList = [];

const onlineUsersSocket ={}//存放当前在线用户的socket

io.on('connection', function (socket) {
    // console.log(socket.name)
    socket.on('login', function (user) {
        // vain为用户名密码为空，success为成功，error为用户名密码错误
        const loginUserInfo = JSON.parse(fs.readFileSync('./config/userInfo.json', 'utf-8'));//所有用户的信息
        //登录时的聊天数据值

        if (!user.userName || !user.userPassword) {
            socket.emit('loginState', {
                type: 'vain',
                message: '账号或者密码为空!'
            });
        } else if (loginUserInfo[user.userName] != undefined && loginUserInfo[user.userName].password == user.userPassword) {
            //如果onlineUsersSocket对象中没有当前用户的socket值，将当前用户的socket放入onlineUsersSocket中
            socket.userName = user.userName;
            if (!onlineUsersSocket[user.userName]){
                onlineUsersSocket[user.userName]=socket;
            }

            // console.log("socket.userName" + socket.userName);
            //如果登录成功，将该用户放到onlineUsersList中，用于显示用户列表
            const onlineUserList = JSON.parse(fs.readFileSync('./config/onlineList.json', 'utf-8'));
            if (!onlineUserList[user.userName]) {
                onlineUserList[user.userName] = {
                    "userName": user.userName,
                    "avatar": loginUserInfo[user.userName].avatar
                }
            }

            //将在线用户写入onlineList.json文件中
            fs.writeFileSync('./config/onlineList.json', new Buffer(JSON.stringify(onlineUserList)))
            //读取message.json的值
            const messageInfo = JSON.parse(fs.readFileSync('./config/message.json', 'utf-8'));

            socket.emit('loginState', {
                type: 'success',
                message: '',

            });

            //返回所有的聊天记录
            const receiveMessage = JSON.parse(fs.readFileSync('./config/message.json', 'utf-8'));
            socket.emit('receiveMessage', {
                receiveData: receiveMessage,
                fromUser:'',//初始化

            })

            

            io.emit('loginUserList', {
                msg: '所有在线用户信息',
                userList: onlineUserList,
            })
            //如果前端发送数据，则在后台将数据存入message.json文件中
        } else {
            socket.emit('loginState', {
                type: 'error',
                message: '账号或者密码不正确!',
            });
        }


    });
    socket.on('msg', function (msg) {
        io.emit('msg', msg);
        robot(msg.message);
        console.log(msg.userName + ':' + msg.message)
    })
    socket.on('register', function (registerData) {
        //读取文件数据库
        const registerInfo = JSON.parse(fs.readFileSync('./config/userInfo.json', 'utf-8'));
        if (!registerData.userName || !registerData.userPassword) {
            socket.emit('registerVain', {
                msg: '用户名密码不能为空'
            })
        } else if (registerInfo[registerData.userName] != undefined) {
            socket.emit('registerError', {
                msg: '已有相同ID'
            })
        } else {
            registerInfo[registerData.userName] = {
                name: registerData.userName,
                password: registerData.userPassword,
                avatar: '../img/2.jpg',
            }
            //写文件数据库
            fs.writeFileSync('./config/userInfo.json', new Buffer(JSON.stringify(registerInfo)))
            socket.emit('registerSuccess', 234)
        }
    });
    socket.on('sendMessage', function (messageData) {
        //读取文件数据库
        const messageInfo = JSON.parse(fs.readFileSync('./config/message.json', 'utf-8'));
        // console.log("messageInfo"+JSON.stringify(messageInfo));

        if (messageData.message) {
            if (!messageInfo[messageData.fromUser]) {
                messageInfo[messageData.fromUser] = [];
            }
            messageInfo[messageData.fromUser].push({
                message: messageData.message,
                time: messageData.time,
                fromUser: messageData.fromUser,
                toUser: messageData.toUser,
            })
            //写文件数据库
            fs.writeFileSync('./config/message.json', new Buffer(JSON.stringify(messageInfo)))

            //如果toUser在onlineUsersSocket中，将向toUser发送接收消息的命令
            if (onlineUsersSocket[messageData.toUser]){
                onlineUsersSocket[messageData.toUser].emit("receiveMessage",{
                    receiveData: messageInfo,
                    fromUser:messageData.fromUser,//该条消息的发送方
                })
            }


        }
    });
    //关闭当前在线用户的按钮，将当前用户从onlineList.json文件里删除
    socket.on('disconnect', function () {
        console.log(socket.id, socket.userName);
        const onlineList = JSON.parse(fs.readFileSync('./config/onlineList.json', 'utf-8'));

        //将当前用户从onlineUsersSocket对象中删除
        if(onlineUsersSocket[socket.userName]){
            delete onlineUsersSocket[socket.userName];
        }

        console.log("onlineUsersSocket"+Object.keys(onlineUsersSocket).length)

        //将当前用户从onlineList.json中删除
        if (onlineList[socket.userName]) {
            delete onlineList[socket.userName]
        }
        fs.writeFileSync('./config/onlineList.json', new Buffer(JSON.stringify(onlineList)))
        //当当前用户退出时，再重新广播一次所有在线用户信息
        io.emit('loginUserList', {
            msg: '所有在线用户信息',
            userList: onlineList,
        })
    });
    //更改头像
    socket.on('changeAvatar',function (data) {
        //所有在线用户的信息
        const allOnlineList = JSON.parse(fs.readFileSync('./config/onlineList.json', 'utf-8'));
        //所有用户信息
        const allUserInfo = JSON.parse(fs.readFileSync('./config/userInfo.json', 'utf-8'));

        if(data.userName){
            if(allOnlineList[data.userName]){
                allOnlineList[data.userName].avatar = data.avatar;
            }

            if(allUserInfo[data.userName]){
                allUserInfo[data.userName].avatar = data.avatar;
            }
        }

        fs.writeFileSync('./config/onlineList.json', new Buffer(JSON.stringify(allOnlineList)))
        fs.writeFileSync('./config/userInfo.json', new Buffer(JSON.stringify(allUserInfo)))

    })


});


/**
 * 服务端连接设置
 */
server.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000，servre running');
});


/**
 * [chat robot]
 * By AI , provide weather, express and some function
 */
function robot(mmm) {
    var bodyQueryStr = {
        key: '955f2c294c33e3ddbabdb8d461d50d34', // TURING key here
        info: mmm,
        userid: '123',
    };
    var contentStr = querystring.stringify(bodyQueryStr);
    var contentLen = Buffer.byteLength(contentStr, 'utf8');
    console.log(util.format('post data: %s, with length: %d', contentStr, contentLen));
    // post 请求设置
    var options = {
        hostname: 'www.tuling123.com',
        path: '/openapi/api',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': contentLen
        }
    };
    var msg = null;
    var all = '';
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('response info=====' + chunk);
            msg = JSON.parse(chunk);
            console.log(msg);
            delete msg.code;
            console.log(msg);
            for (var listR in msg) {
                console.log(msg[listR])
                all = all + ' ' + msg[listR]
            }
            io.emit('msg', {
                userName: '穹妹',
                message: all,
            })
        });
        res.on('end', function () {
            console.log('No more data in response.')
        })
    });
    req.on('error', function (e) {
        console.log('problem with request:' + e.message);
    });
    req.write(contentStr);
    req.end();
}