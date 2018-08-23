import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import RightDisplay from './rightDisplay'
import LeftDisplay from './leftDisplay'
//const socket = io.connect('http://localhost:3000');

export default class DisplayBox extends Component {
    constructor(props) {
        super(props);
    }

    //开始进入页面中，没有toUser，显示“我是显示框”，点击在线用户，显示当前用户与选中的在线用户的聊天记录，若没有信息，显示“请开始与当前选中用户聊天吧”，若有以往聊天记录，显示以往聊天记录
    render() {
        if (!this.props.toUser) {
            return (
                <div className='displayBox'>
                    我是显示框
                </div>
            )
        } else {
            const chatRecord = [];//定义当前聊天的两个用户的聊天信息

            if (this.props.message[this.props.userName]) {
                //当前用户与选中用户的聊天信息
                this.props.message[this.props.userName].map((item, index) => {
                    if (item.toUser == this.props.toUser) {
                        chatRecord.push(item);
                    }
                })
            }

            if (this.props.message[this.props.toUser]) {
                //选中用户与当前用户的聊天信息
                this.props.message[this.props.toUser].map((item, index) => {
                    if (item.toUser == this.props.userName) {
                        chatRecord.push(item);
                    }
                })
            }

            chatRecord.sort(function(a, b){
                return a.time < b.time ? -1 : 1;
            });
            // console.log("chatRecord.length" + chatRecord.length);
            // console.log(JSON.stringify(this.props.message))
            //如果chatRecord的长度不为0，将当前用户与选中用户的聊天记录放到displayBox，当前用户与选中用户的聊天记录，放到右边；选中用户与当前用户的聊天记录，放到左边
            if (chatRecord.length) {
                let userMessage;

                userMessage = chatRecord.map((item, index) => {
                    if (item.fromUser == this.props.userName && item.toUser == this.props.toUser) {
                        return <RightDisplay message={item.message}/>
                    } else if (item.toUser == this.props.userName && item.fromUser == this.props.toUser){
                        return <LeftDisplay message={item.message}/>
                    }
                })
                return (
                    <div className='displayBox'>
                        {userMessage}
                    </div>
                )
            } else {
                return (
                    <div className='displayBox'>
                        请与{this.props.toUser}开始聊天吧
                    </div>
                )
            }

        }
        // if (this.props.message) {
        //     console.log("fafhfjfj:"+JSON.stringify(this.props.message['gaoya']));
        //     console.log("ccsanb:"+this.props.userName);
        //     console.log("cewere:"+this.props.toUser)
        //
        //     const chatRecord = [];
        //     this.props.message[this.props.userName].map((item,index)=>{
        //         if(item.toUser == this.props.toUser){
        //             chatRecord.push(item);
        //         }
        //     })
        //
        //     this.props.message[this.props.toUser].map((item,index)=>{
        //         if(item.fromUser == this.props.userName){
        //             chatRecord.push(item);
        //         }
        //     })
        //     if (!chatRecord){
        //         return (
        //             <div className='displayBox'>
        //                 我是占位符
        //                 {/*{*/}
        //                 {/*chatRecord.map((item, index) => {*/}
        //                 {/*if (item.fromUser == this.props.userName) {*/}
        //                 {/*return <RightDisplay message={item.message}/>*/}
        //                 {/*} else {*/}
        //                 {/*return <LeftDisplay message={item.message}/>*/}
        //                 {/*}*/}
        //                 {/*})*/}
        //                 {/*}*/}
        //
        //             </div>
        //         )
        //     }else {
        //         return (
        //             <div className='displayBox'>
        //                 我们可以聊天了
        //             </div>
        //         )
        //     }
        //     // chatRecord.push(this.props.message[this.props.userName]);
        //     // chatRecord.push(this.props.message.)
        //
        // } else {
        //     return (
        //         <div className='displayBox'>
        //             我是显示框
        //         </div>
        //     )
        //
        // }
    }
}