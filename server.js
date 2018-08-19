const express = require('express');
const app = require('express')();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
const querystring = require('querystring');
const util = require('util');
const fs =require('fs');
var router = express.Router();
const loginInfo = JSON.parse(fs.readFileSync('./config/userInfo.json','utf-8'));

app.use('/',router);
app.use(express.static('app'));

// 处理get请求
router.get('/geCookie', function(req, res) {
	var reqInfo = req.param('userName');//解析用户名
	var cookieInfo = loginInfo[reqInfo];//找到该用户的所有信息
    res.send({
        'userName':cookieInfo.name,
        'userAvatar':cookieInfo.avatar
    });
});

// 处理get请求
router.get('/11222', function(req, res) {

    res.send({
		'uid':'uid',
        'username':'j1ohn',
        'sex':'man',
        'address':'上海'
    });
});

// const cookieFunction = require('cookie.js')


// 在线用户信息
const onlineUsers = [];

// const onlineUsersSocket ={}

io.on('connection', function(socket) {
	console.log(socket.id)
	socket.on('login', function(user) {
		// if (onlineUsers.indexOf(user.userName) === -1) {
        	// 	// 	onlineUsers.push(user.userName);
        	// 	// 	socket.emit('loginState', false);
        	// 	// 	console.log('在线用户：' + onlineUsers);
        	// 	// 	io.emit('loginUser', onlineUsers);
        	// 	// 	socket.name = user.userName;
        	// 	// } else {
        	// 	// 	socket.emit('logstate', 'same')
        	// 	// }】

		// if(onlineUsersSocket[user.userName]===undefined){
         //    onlineUsersSocket[user.userName] = socket;
		// }
        // vain为用户名密码为空，success为成功，error为用户名密码错误
        const loginInfo = JSON.parse(fs.readFileSync('./config/userInfo.json','utf-8'));
        //登录时的聊天数据值

		if(!user.userName|| !user.userPassword){
            socket.emit('loginState', {
            	type:'vain',
				message:'账号或者密码为空!'
			});
		}else if(loginInfo[user.userName] != undefined && loginInfo[user.userName].password == user.userPassword){

            const messageInfo = JSON.parse(fs.readFileSync('./config/message.json','utf-8'));

            socket.emit('loginState', {
                type:'success',
                message:'',

            });

            //初始状态，用户以前的聊天记录
            const initialMessage = JSON.parse(fs.readFileSync('./config/message.json','utf-8'));

            console.log('send init')
            socket.emit('initialMessage',{
                initialData:initialMessage[user.userName],
			})
		}else {
            socket.emit('loginState', {
            	type:'error',
				message:'账号或者密码不正确!',
			});
        }

	});
	socket.on('msg', function(msg) {
		io.emit('msg', msg);
		robot(msg.message);
		console.log(msg.userName + ':' + msg.message)
	})
	socket.on('disconnect', function() {
		// if (onlineUsers.indexOf(socket.name) + 1) {
		// 	console.log('用户退出:' + socket.name)
		// 	var i = onlineUsers.indexOf(socket.name)
		// 	onlineUsers.splice(i, 1);
		// 	socket.broadcast.emit('quit', socket.name);
		// 	io.emit('loginUser', onlineUsers, 'quitinfo')
		// }
        // if(onlineUsersSocket[user.userName]!==undefined){
         //    delete onlineUsersSocket[user.userName];
        // }
	});
    socket.on('register', function(registerData) {
    	//读取文件数据库
        const registerInfo = JSON.parse(fs.readFileSync('./config/userInfo.json','utf-8'));
        if(!registerData.userName|| !registerData.userPassword){
        	socket.emit('registerVain',{
        		msg:'用户名密码不能为空'
			})
		}else if(registerInfo[registerData.userName]!=undefined){
            socket.emit('registerError', {
            	msg:'已有相同ID'
			})
		}else {
            registerInfo[registerData.userName]={
            	name:registerData.userName,
                password:registerData.userPassword,
                avatar:'../img/2.jpg',
			}
            //写文件数据库
			fs.writeFileSync('./config/userInfo.json',new Buffer(JSON.stringify(registerInfo)))
            socket.emit('registerSuccess', 234)
        }
    });
    socket.on('sendMessage', function(messageData) {
        //读取文件数据库
        const messageInfo = JSON.parse(fs.readFileSync('./config/message.json','utf-8'));
        // console.log("messageInfo"+JSON.stringify(messageInfo));

        if(!messageData.message){
        	//如果用户没有输入信息，点击了发送按钮，则弹出请输入有效值
            socket.emit('inputVain',{
                msg:'请输入有效值'
            })
		}else {
        	if(!messageInfo[messageData.fromUser]){
                messageInfo[messageData.fromUser] =[];
			}
            messageInfo[messageData.fromUser].push({
                message:messageData.message,
                time:messageData.time,
                fromUser:messageData.fromUser,
                toUser:messageData.toUser,
            })
            //写文件数据库
            fs.writeFileSync('./config/message.json',new Buffer(JSON.stringify(messageInfo)))
            socket.emit('inputSuccess', {
                msg:'成功'
			})

			socket.emit('sendToMyself',{
				message:messageInfo[messageData.fromUser]
			})
			// const toSocket = onlineUsersSocket[messageData.toUser]
			// if(toSocket){
             //    toSocket.emit('receiveMessage',{
             //        message:messageData.message,
             //        time:messageData.time,
             //        fromUser:messageData.fromUser,
             //        toUser:messageData.toUser,
			// 	})
			// }
        }
    });

});


/**
 * 服务端连接设置
 */
server.listen(process.env.PORT || 3000, function() {
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
	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
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
		res.on('end', function() {
			console.log('No more data in response.')
		})
	});
	req.on('error', function(e) {
		console.log('problem with request:' + e.message);
	});
	req.write(contentStr);
	req.end();
}