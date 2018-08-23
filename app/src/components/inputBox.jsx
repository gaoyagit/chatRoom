import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
//const socket = io.connect('http://localhost:3000');

export default class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            fromUser: props.userName,
            toUser: props.toUser,
            time: '',
            inputText: '',
        }

        // this.props.socket.on('inputSuccess', function (data) {
        //     alert(data.msg);
        // })
    }

    handleInput() {
        this.props.onClickChange({
            message: this.state.message,
            time: this.state.time,
            fromUser: this.props.userName,
            toUser: this.props.toUser,
        })
        this.props.socket.emit('sendMessage', {
            message: this.state.message,
            time: this.state.time,
            fromUser: this.props.userName,
            toUser: this.props.toUser,
        })

        this.setState({
            inputText: ''
        })

    }

    render() {
        return (
            <div className='inputBox'>
        <textarea
            onChange={(e) => {
                this.setState({
                    message: e.target.value,
                    time: (new Date()).toLocaleString(),
                    inputText: e.target.value
                })
            }}
            className='inputDetails'
            // placeholder='我是输入框'
            value={this.state.inputText}>


        </textarea>
                <button
                    className='sendBtn'
                    onClick={() => {
                        this.handleInput()
                    }}>发送
                </button>
            </div>
        )
    }
}

