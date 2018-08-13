const express = require('express');
const app = require('express')();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
const querystring = require('querystring');
const util = require('util');
const fs =require('fs');

app.use(express.static('app'));

// 在线用户信息
const onlineUsers = [];

io.on('connection', function(socket) {
	socket.on('login', function(user) {
		// if (onlineUsers.indexOf(user.userName) === -1) {
        	// 	// 	onlineUsers.push(user.userName);
        	// 	// 	socket.emit('loginState', false);
        	// 	// 	console.log('在线用户：' + onlineUsers);
        	// 	// 	io.emit('loginUser', onlineUsers);
        	// 	// 	socket.name = user.userName;
        	// 	// } else {
        	// 	// 	socket.emit('logstate', 'same')
        	// 	// }
        // vain为用户名密码为空，success为成功，error为用户名密码错误
        const loginInfo = JSON.parse(fs.readFileSync('./config/userInfo.json','utf-8'));
		if(!user.userName|| !user.userPassword){
            socket.emit('loginState', 'vain');
		}else if(loginInfo[user.userName] != undefined && loginInfo[user.userName].password == user.userPassword ){
            socket.emit('loginState', 'success');
		}else {
            socket.emit('loginState', 'error');
        }

	});
	socket.on('msg', function(msg) {
		io.emit('msg', msg);
		robot(msg.message);
		console.log(msg.userName + ':' + msg.message)
	})
	socket.on('disconnect', function() {
		if (onlineUsers.indexOf(socket.name) + 1) {
			console.log('用户退出:' + socket.name)
			var i = onlineUsers.indexOf(socket.name)
			onlineUsers.splice(i, 1);
			socket.broadcast.emit('quit', socket.name);
			io.emit('loginUser', onlineUsers, 'quitinfo')
		}
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
			}
            //写文件数据库
			fs.writeFileSync('./config/userInfo.json',new Buffer(JSON.stringify(registerInfo)))
            socket.emit('registerSuccess', 234)
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