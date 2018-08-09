
import React from 'react';
// 事件周期
export default class Chat extends React.Component {

    componentDidMount() {
        //window.history.replaceState(null, 'Login', 'login')
    }
    render() {
        return (
            <div id="loginbox">
                <h1>开始聊天</h1>
            </div>
        );
    }
}
