import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login.jsx';
import Chat from './components/chat.jsx';
import Register from './components/register.jsx';
import {Route, Switch, HashRouter} from 'react-router-dom'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const addSocket = (Component) => {
    return <Component socket={socket}/>
}

// 渲染登录框
ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={props => <Login {...props} socket={socket}/>}/>
            <Route path="/chat" component={props => <Chat {...props} socket={socket}/>}/>
            <Route path="/register" component={props => <Register {...props} socket={socket}/>}/>
        </Switch>
    </HashRouter>
    ,
    document.getElementById('chat'));






