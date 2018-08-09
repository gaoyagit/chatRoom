import io from 'socket.io-client';
import React from 'react';
import {Link} from 'react-router-dom'
const socket = io.connect('http://localhost:3000');

export default class LogIn extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            userPassword:''
        };
        socket.on(`loginState`, result => {
            if (result) {
                this.props.history.push('chat');
            } else{
                alert('账号或者密码不正确')
            }
        });
    }
    handleLogin(){
        socket.emit('login', {
            'userName': this.state.userName,
            'userPassword': this.state.userPassword
        })
    }
    render() {
        return (
            <div id="loginbox">
                <h1>欢迎登录聊天室</h1>
                <input
                    type="text"
                    placeholder="ID"
                    onClick={(e)=>{
                        this.setState({
                            userName:e.target.value
                        })
                    }}
                    className="form-control"/>
                <input
                    type="password"
                    placeholder="密码"
                    onClick={(e)=>{
                        this.setState({
                            userPassword:e.target.value
                        })
                    }}
                    className="form-control"/>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={()=>{
                        this.handleLogin()
                    }}>登录</button>
                <div>
                    <Link to='/register'>还没有账号?点击注册</Link>
                </div>
            </div>
        );
    }
}
