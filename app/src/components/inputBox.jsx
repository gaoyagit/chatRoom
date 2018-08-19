import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
//const socket = io.connect('http://localhost:3000');

export default class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:'',
            fromUser:props.userName,
            toUser:'大黄',
            time:'',
        // (new Date()).toLocaleString()
        }

        this.props.socket.on('inputSuccess',function (data) {
            alert(data.msg);
        })

        this.props.socket.on('inputVain',function (data) {
            alert(data.msg);
        })
    }

    handleInput(){
        this.props.onClickChange({
            message:this.state.message,
            time:this.state.time,
            fromUser:this.props.userName,
            toUser:'大黄',
        })
        this.props.socket.emit('sendMessage',{
            message:this.state.message,
            time:this.state.time,
            fromUser:this.props.userName,
            toUser:'大黄',
        })
    }

    render() {
        return (
            <div className='inputBox'>
        <textarea
            onChange={(e) => {
                this.setState({
                    message: e.target.value,
                    time:(new Date()).toLocaleString()
                })
            }}
            className='inputDetails'
            placeholder='我是输入框'>
        </textarea>
                <button
                    className='sendBtn'
                    onClick={()=>{
                        this.handleInput()
                    }}>发送</button>
            </div>
        )
    }
}

