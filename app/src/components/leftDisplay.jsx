import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';

export default class LeftDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='leftDisplayBox'>
                <img src={this.props.avatar}/>
                <div className='message'>{this.props.message}</div>
            </div>
        )
    }
}