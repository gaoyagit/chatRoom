import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import RightDisplay from './rightDisplay'
import LeftDisplay from './leftDisplay'

function UserDisplay(props) {
    return(
        <div className='userListBox'>
            <img src='../img/1.jpeg'>&nbsp;&nbsp;{props.userName}</img>
        </div>
    )
}
export default class UserList extends Component{
    constructor(props){
        super(props)

        console.log("this.props.onlineUserList.length:"+props.onlineUserList.toString());
        // var test = {"gaoya":{"userName":"gaoya"},"大黄":{"userName":"大黄"}}
        for(let item in (this.props.onlineUserList)){
            console.log("12ewfhqwnfoq");
            console.log("1111"+item+" : "+ props.onlineUserList[item].userName);
        }

        console.log("122の3this.props.onlineUserList.length:"+Object.keys(props.onlineUserList));

    }
    
    render(){
        return(
            <div className='userListBox'>
                <input type='text' placeholder="搜索框21" className='search'/>
                {

                }
            </div>

        )
    }
} 
// function UserList(props) {
//     return(
//         <div className='userListBox'>
//             <input type='text' placeholder="搜索框21" className='search'/>
//             <div className='onlineUser'>
//                 <img src='../img/1.jpeg'/>&nbsp;&nbsp;我是小黄</div>
//             <div className='onlineUser'>
//                 <img src='../img/3.jpeg'/>&nbsp;&nbsp;我是小王</div>
//             <div className='onlineUser'>
//                 <img src='../img/4.jpg'/>&nbsp;&nbsp;我是小陈</div>
//             <div className='onlineUser'>
//                 <img src='../img/5.jpg'/>&nbsp;&nbsp;我是小赵</div>
//         </div>
//     )
//
// }