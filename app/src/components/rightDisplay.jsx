import React, {Component} from 'react'


export default class RightDisplay extends Component {
    constructor(props) {
        super(props);
        // console.log('right',123123)
    }

    componentDidMount() {
        // console.log(this.state.message);
    }

    render() {
        return (
            <div className='rightDisplayBox'>
                <div className='message'>{this.props.message}</div>
                <img src={this.props.avatar}/>
            </div>
        )
    }
}