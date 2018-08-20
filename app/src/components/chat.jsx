import React from 'react';
import InputBox from './inputBox'
import DisplayBox from './displayBox'
import UserList from './userList'
import {Link} from 'react-router-dom'
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3000');
const cookieFunction = require('../../../cookie.js')
// 事件周期

function UserInfo(props){
    return (
        <div className='userBox'>
            <div className='userName'>{props.userName}</div>
            <img className='userAvatar' src={props.userAvatar} alt='我是头像'></img>
        </div>
    )
}


export default class Chat extends React.Component {

    constructor(props){
        super(props);
        this.state={
            onlineUser:cookieFunction.getCookie('userName'),
            userAvatar:'',
            myselfMessage:'',
            myselfTime:'',
            initialData:[],
            onlineUserList:{},
        };
        this.props.socket.on('initialMessage',(data)=>{
            this.setState({
                    initialData:data.initialData,
                }
            )
            // console.log(data.initialData)
            // console.log("data.length"+(data.initialData).length)
            // // for (var i = 0;i<JSON.stringify(data.initialData).length;i++){
            // //     console.log(JSON.stringify(data.initialData)[i]);
            // // }
        })

        this.props.socket.on('loginUserList',(data)=>{
            this.setState({
                onlineUserList:data.userList,
            })
        })
        // console.log("this.state.onlineUserList:"+this.state.onlineUserList)
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
        xmlhttp.onreadystatechange=()=>{
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                console.log(_this)
                this.setState({
                    onlineUser:JSON.parse(xmlhttp.responseText).userName,
                    userAvatar:JSON.parse(xmlhttp.responseText).userAvatar

                },()=> {
                    // console.log("this.state.onlineUser:"+ _this.state.onlineUser)
                    // console.log("this.state.onlineUser:"+ _this.state.userAvatar)
                    })
                // console.log(xmlhttp.responseText);
            }
        }
        // xmlhttp.open("GET","http://127.0.0.1:3000/geCookie",true);
        xmlhttp.open("GET","http://127.0.0.1:3000/geCookie?userName="+_this.state.onlineUser,true);

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
                    <UserInfo userName = {this.state.onlineUser} userAvatar={this.state.userAvatar}/>
                    <UserList onlineUserList={this.state.onlineUserList}/>
                </div>
                <div id='informationBox'>
                    <DisplayBox userName = {this.state.onlineUser} message={this.state.initialData} />
                    <InputBox userName = {this.state.onlineUser}  socket={this.props.socket} onClickChange={(message)=>{
                        this.state.initialData.push(message)
                     this.setState({
                         initialData:this.state.initialData
                     })
                    }}/>
                </div>
            </div>
        );
    }
}