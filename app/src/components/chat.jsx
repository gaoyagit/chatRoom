import React from 'react';
import InputBox from './inputBox'
import DisplayBox from './displayBox'
import UserList from './userList'
import {Link} from 'react-router-dom'
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3000');
const cookieFunction = require('../../../cookie.js')

// 事件周期

function UserInfo(props) {
    return (
        <div className='userBox'>
            <div className='userName'>{props.userName}</div>
            <img className='userAvatar' src={props.userAvatar} alt='我是头像'></img>
        </div>
    )
}


export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onlineUser: cookieFunction.getCookie('userName'),
            userAvatar: '',
            receiveData: [],
            onlineUserList: {},
            toUser: '',//当前用户和谁在聊天，显示聊天记录
        };


        this.props.socket.on('loginUserList', (data) => {
            this.setState({
                onlineUserList: data.userList,
                toUser: data.userList[Object.keys(data.userList)[0]].userName,
            })
            // console.log("data.msg"+data.userList);
            // console.log("data.msg"+data.userList[Object.keys(data.userList)[0]].userName);
        })

        this.props.socket.on('receiveMessage', (data) => {
            this.setState({
                    receiveData: data.receiveData,
                }
            )

        })
    }


    componentDidMount() {
        var _this = this;
        var xmlhttp;
        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        }
        else {
            // IE6, IE5 浏览器执行代码
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // console.log(_this)
                this.setState({
                    onlineUser: JSON.parse(xmlhttp.responseText).userName,
                    userAvatar: JSON.parse(xmlhttp.responseText).userAvatar

                }, () => {
                    // console.log("this.state.onlineUser:"+ _this.state.onlineUser)
                    // console.log("this.state.onlineUser:"+ _this.state.userAvatar)
                })
                // console.log(xmlhttp.responseText);
            }

            if (_this.state.onlineUser) {
                this.setState({
                    onlineUserList: _this.state.onlineUserList,
                })
            }
        }
        // xmlhttp.open("GET","http://127.0.0.1:3000/geCookie",true);
        xmlhttp.open("GET", "http://127.0.0.1:3000/geCookie?userName=" + _this.state.onlineUser, true);

        xmlhttp.send();

        //window.history.replaceState(null, 'Login', 'login')
        // alert(this.props.location.query.userName);
        // alert(cookieFunction.getCookie('userName'));

        // console.log(getCookieInfo.name);


    }

    //点击用户列表中的一个用户，用来找toUser，以及聊天记录
    toUserChange(toUser){
        // console.log("toUser"+toUser);
        this.setState({
            toUser:toUser
        })
    }

    render() {
        return (
            <div id="chatBox">
                <div id='userInfoBox'>
                    <UserInfo
                        userName={this.state.onlineUser}
                        userAvatar={this.state.userAvatar}/>
                    <UserList
                        onlineUserList={this.state.onlineUserList}
                        toUserChange = {this.toUserChange.bind(this)}/>
                </div>
                <div id='informationBox'>
                    <DisplayBox
                        userName={this.state.onlineUser}
                        message={this.state.receiveData}
                        toUser={this.state.toUser}/>
                    <InputBox
                        userName={this.state.onlineUser}
                        socket={this.props.socket}
                        onClickChange={(message) => {
                        this.state.receiveData.push(message)
                        this.setState({
                            receiveData: this.state.receiveData
                        })
                    }}/>
                </div>
            </div>
        );
    }
}