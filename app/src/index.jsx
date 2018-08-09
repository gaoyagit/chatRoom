import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './components/login.jsx';
import Chat from './components/chat.jsx';
import {Route,Switch,HashRouter} from 'react-router-dom'
const About = React.createClass({
    render() {
        return <h3>About</h3>
    }
})
// 渲染登录框
ReactDOM.render(
    <HashRouter >
        <Switch>
            <Route exact path="/" component={LogIn}/>
            <Route path="/chat" component={Chat}/>
        </Switch>
    </HashRouter>
    ,
    document.getElementById('chat'));





