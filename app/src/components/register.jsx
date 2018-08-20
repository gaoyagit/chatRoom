import React from 'react';
import {Link} from 'react-router-dom'
//import io from 'socket.io-client';
//const socket = io.connect('http://localhost:3000');
// 事件周期
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: ''
        };
        this.socket = this.props.socket;
        this.socket.on('registerSuccess', () => {
            this.props.history.push('/');//跳转
        })

        this.socket.on('registerError', function (data) {
            alert(data.msg)
        })

        this.socket.on('registerVain', function (data) {
            alert(data.msg);
        })
    }

    handleRegister() {
        this.socket.emit('register', {
            userName: this.state.userName,
            userPassword: this.state.userPassword,
        })
    }

    render() {
        return (
            <div id="loginbox">
                <input
                    type="text"
                    placeholder="ID"
                    onChange={(e) => {
                        this.setState({
                            userName: e.target.value
                        })
                    }}
                    className="form-control"/>
                <input
                    type="password"
                    placeholder="密码"
                    onChange={(e) => {
                        this.setState({
                            userPassword: e.target.value
                        })
                    }}
                    className="form-control"/>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                        this.handleRegister()
                    }}>注册
                </button>
                <div>
                    <Link to='/register'>还没有账号?点击注册</Link>
                </div>
            </div>
        );
    }
}
