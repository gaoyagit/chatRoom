import React, {Component} from 'react'
import SingleUser from './single'

// function SingleUser(props) {
//
//     return (
//         <div className='onlineUser' onClick={this.handleToUser.bind(this)}>
//             <img src='../img/1.jpeg'>&nbsp;&nbsp;{props.userName}</img>
//         </div>
//     )
// }
// export default class SingleUser extends Component{
//     constructor(props){
//         super(props);
//     }
//
//     handleToUser(){
//         alert('点我了!')
//     }
//
//     render(){
//         return(
//             <div className='onlineUser' onClick={this.handleToUser.bind(this)}>
//                 <img src='../img/1.jpeg'>&nbsp;&nbsp;{this.props.userName}</img>
//             </div>
//         )
//     }
// }


export default class UserList extends Component {
    constructor(props) {
        super(props)

        // this.handleToUser= this.handleToUser.bind(this);
    }

    // handleToUser(){
    //     alert('点我了!')
    // }

    render() {
        return (
            <div className='userListBox'>
                <input type='text' placeholder="搜索框21" className='search'/>
                {
                    Object.keys(this.props.onlineUserList).map((key) => {
                        return <SingleUser
                            userName={this.props.onlineUserList[key].userName}
                        />
                    })

                }
            </div>

        )
    }
}
