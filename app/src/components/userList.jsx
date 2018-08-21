import React, {Component} from 'react'

export default class UserList extends Component {
    constructor(props) {
        super(props)
        const checkedList={}
        Object.keys(this.props.onlineUserList).map((key)=>{
            checkedList[this.props.onlineUserList[key].userName]=false;
        })
        this.state={
            checkedList:checkedList
        }
    }

    handleClick(userName){
        Object.keys(this.state.checkedList).map((key)=>{
            this.state.checkedList[key]=false;
        })
        this.state.checkedList[userName]=true;
        this.setState({
            checkedList:this.state.checkedList,
        })
    }

    render() {

        return (
            <div className='userListBox'>
                <input type='text' placeholder="搜索框21" className='search'/>
                {
                    Object.keys(this.props.onlineUserList).map((key) => {

                        const userName= this.props.onlineUserList[key].userName;
                        const rowStyle = {
                            backgroundColor: this.state.checkedList[userName] ? 'blue' : 'red'
                        };

                        return (
                            <div className='onlineUser' onClick={this.handleClick.bind(this,userName)} style={rowStyle}>
                                <img src='../img/1.jpeg'>&nbsp;&nbsp;{userName}</img>
                            </div>
                        )
                    })

                }
            </div>

        )
    }
}
