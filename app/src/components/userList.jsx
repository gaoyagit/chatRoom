import React, {Component} from 'react'

function SingleUser(props) {
    return (
        <div className='onlineUser'>
            <img src='../img/1.jpeg'>&nbsp;&nbsp;{props.userName}</img>
        </div>
    )
}

export default class UserList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='userListBox'>
                <input type='text' placeholder="搜索框21" className='search'/>
                {/*<SingleUser userName="我是大黄"/>*/}
                {
                    Object.keys(this.props.onlineUserList).map((key) => {
                        // console.log("111"+this.props.onlineUserList[key].userName);
                        return <SingleUser userName={this.props.onlineUserList[key].userName}/>
                        // {this.props.onlineUserList[key].userName}
                    })

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