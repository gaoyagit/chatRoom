import React from 'react';
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');
// 事件周期

function UserInfo(props){
    return (
        <div className='userBox'>
            <div className='userName'>{props.userName}</div>
            <img className='userAvatar' src='../img/1.jpeg'></img>
        </div>
    )
}

function UserList(props) {
    return(
        <div className='userListBox'>
            <input type='text' placeholder="搜索框" className='search'/>
            <div className='onlineUser'>
                <img src='../img/2.jpg'/>&nbsp;&nbsp;我是小黄</div>
            <div className='onlineUser'>
                <img src='../img/3.jpeg'/>&nbsp;&nbsp;我是小王</div>
            <div className='onlineUser'>
                <img src='../img/4.jpg'/>&nbsp;&nbsp;我是小陈</div>
            <div className='onlineUser'>
                <img src='../img/5.jpg'/>&nbsp;&nbsp;我是小赵</div>
        </div>
    )
    
}

function InputBox(props) {
    return (
        <div className='inputBox'>
            <textarea className='inputDetails' placeholder='我是输入框'>
                </textarea>
            <button className='sendBtn'>发送</button>
        </div>

    )
}

function DisplayBox(props) {
    return <div className='displayBox'>
        我是显示框
        </div>
}
export default class Chat extends React.Component {

    constructor(props){
        super(props);
        this.state={
            userName:'gaoya',
            onlineUser:'',
                // cookieFunction.getCookie('userName'),
        };

    }
    componentDidMount() {
        var _this = this;

        var xmlhttp;
        if (window.XMLHttpRequest)
        {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp=new XMLHttpRequest();
        }
        else
        {
            // IE6, IE5 浏览器执行代码
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                _this.setState({
                    onlineUser:JSON.parse(JSON.stringify(xmlhttp.responseText)).userName
                },()=> {
                        console.log("this.state.onlineUser:"+ _this.state.onlineUser)
                    })
                console.log(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET","http://127.0.0.1:3000/geCookie",true);
        xmlhttp.send();

        //window.history.replaceState(null, 'Login', 'login')
        // alert(this.props.location.query.userName);
        // alert(cookieFunction.getCookie('userName'));

        // console.log(getCookieInfo.name);


    }
    render() {
        return (
            <div id="chatBox">
                <div id='userInfoBox'>
                    <UserInfo userName = {this.state.onlineUser}/>
                    <UserList />
                </div>
                <div id='informationBox'>
                    <DisplayBox />
                    <InputBox />
                </div>
            </div>
        );
    }
}
