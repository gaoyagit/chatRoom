import React, {Component} from 'react'

export default class UserList extends Component {
    constructor(props) {
        super(props)
        const checkedList = {}

        Object.keys(this.props.onlineUserList)
            .filter((key)=>{
                return key != this.props.onlineUser
            })
            .map((key) => {
                // console.log("key我方"+key);
                checkedList[this.props.onlineUserList[key].userName] = false;

            })

        this.state = {
            checkedList: checkedList,
            // count: this.props.count,//显示未读消息的数量；
            // flag:0,//信息是否已读，未读设为0，已读设为1
        }
    }

    componentDidMount(){
        console.log("this.props.onlineUserList"+this.props.onlineUserList);
        console.log("this.props.onlineUser"+this.props.onlineUser);
        console.log(Object.keys(this.props.onlineUserList).length + "  " + "checkedList");

    }


    handleClick(userName) {
        Object.keys(this.state.checkedList).map((key) => {
            this.state.checkedList[key] = false;
        })
        this.state.checkedList[userName] = true;
        this.setState({
            checkedList: this.state.checkedList,
            // count: 0,
        })
        this.props.toUserChange(userName);

        this.props.resetCountArray(userName);

    }

    render() {

        return (
            <div className='userListBox'>
                <input type='text' placeholder="搜索框21" className='search'/>
                {
                    Object.keys(this.props.onlineUserList)
                        .filter((key)=>{
                            return key != this.props.onlineUser
                        })
                        .map((key) => {

                            const userName = this.props.onlineUserList[key].userName;
                            const rowStyle = {
                                backgroundColor: this.state.checkedList[userName] ? '#333333' : '#222211'
                            };

                            return (
                                <div className='onlineUser' onClick={this.handleClick.bind(this, userName)}
                                     style={rowStyle}>
                                    <div className='imgInfo'>
                                        <img src={this.props.onlineUserList[userName].avatar}>&nbsp;&nbsp;{userName}</img>
                                    </div>
                                    <div className='messageCount'>{
                                        this.props.countArray[userName].count ? this.props.countArray[userName].count : null
                                    }</div>
                                </div>
                            )
                        })

                }
            </div>

        )
    }
}
