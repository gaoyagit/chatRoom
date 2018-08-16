import React, {Component} from 'react'

export default class InputBox extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='inputBox'>
        <textarea
            onChange={(e) => {
                this.setState({
                    message: e.target.value
                })
            }}
            className='inputDetails'
            placeholder='我是输入框'>
        </textarea>
                <button className='sendBtn'>发送</button>
            </div>
        )
    }
}

