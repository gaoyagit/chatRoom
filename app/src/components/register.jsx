
import React from 'react';
// 事件周期
export default class Register extends React.Component {

    componentDidMount() {
        //window.history.replaceState(null, 'Login', 'login')
    }
    render() {
        return (
            <div id="loginbox">
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
                        this.handleRegiser()
                    }}>注册</button>
            </div>
        );
    }
}
