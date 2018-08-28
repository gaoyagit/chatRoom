import React from 'react';
import InputBox from './inputBox'
import DisplayBox from './displayBox'
import UserList from './userList'
import UserInfo from './userInfo'
import {Link} from 'react-router-dom'
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3000');
const cookieFunction = require('../../../cookie.js')

// 事件周期
export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onlineUser: cookieFunction.getCookie('userName'),
            userAvatar: '',//当前用户的头像
            receiveData: {},
            onlineUserList: {},
            toUser: '',//当前用户和谁在聊天，显示聊天记录
            toUserAvatar:'',//保存选中用户的头像
            countArray: [],//存放不同用户的未读消息的数量以及消息来源用户，如gaoya：{fromUser：gaoya，count：2}；
        };

        //将当前touser设为userlist列表中的第一个用户
        this.props.socket.on('loginUserList', (data) => {
            Object.keys(data.userList).map((item,index)=>{
                if(!this.state.countArray[item]){
                    this.state.countArray[item]={
                        fromUser:item.userName,
                        count:0,
                    }
                }

            })

            this.setState({
                onlineUserList: data.userList,
                countArray:this.state.countArray,
            })

        })

        this.props.socket.on('receiveMessage', (data) => {
            if (data.fromUser){
                this.state.countArray[data.fromUser].count++;
                console.log("this.state.countArray[data.fromUser].count++:"+this.state.countArray[data.fromUser].count)
            }

            this.setState({
                receiveData: data.receiveData,
                countArray:this.state.countArray
            })


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

                })
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
    toUserChange(toUser) {

        // console.log("this.state.onlineUserList[toUser].avatar"+this.state.onlineUserList[toUser].avatar);
        // console.log("toUser"+toUser);
        this.setState({
            toUser: toUser,
            toUserAvatar:this.state.onlineUserList[toUser].avatar
        })
    }

    //更改头像
    userAvatarChange(data){
        this.setState({
            userAvatar:data.src
        })
    }

    resetCountArray(userName){
        this.state.countArray[userName].count = 0;
        this.setState({
            countArray:this.state.countArray
        })
    }

    render() {
        return (
            <div id="chatBox">
                <div id='userInfoBox'>
                    <UserInfo
                        userName={this.state.onlineUser}
                        userAvatar={this.state.userAvatar}
                        socket={this.props.socket}
                        userAvatarChange={this.userAvatarChange.bind(this)}/>
                    <UserList
                        onlineUserList={this.state.onlineUserList}
                        toUserChange={this.toUserChange.bind(this)}
                        onlineUser={this.state.onlineUser}
                        countArray={this.state.countArray}
                        resetCountArray={this.resetCountArray.bind(this)}
                    />
                </div>
                <div id='informationBox'>
                    <DisplayBox
                        userName={this.state.onlineUser}
                        userAvatar={this.state.userAvatar}
                        message={this.state.receiveData}
                        toUser={this.state.toUser}
                        toUserAvatar={this.state.toUserAvatar}/>
                    <InputBox
                        userName={this.state.onlineUser}
                        toUser={this.state.toUser}
                        socket={this.props.socket}
                        onClickChange={(message) => {
                            if (!this.state.receiveData[message.fromUser]) {
                                this.state.receiveData[message.fromUser] = [];
                            } else {
                                this.state.receiveData[message.fromUser].push(message)
                            }

                            this.setState({
                                receiveData: this.state.receiveData
                            })

                        }}/>
                </div>
            </div>
        );
    }
}