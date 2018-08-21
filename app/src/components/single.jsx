import React, {Component} from 'react'

export default class SingleUser extends Component{

    constructor(props){
        super(props);

        this.state={checked: false};
    }


    handleToUser(e){
        this.setState({
            checked: !this.state.checked,
        });
        // this.style.backgroundColor = 'red';
        alert(this.props.userName);
    }

    render(){
        var rowStyle = {
            backgroundColor: this.state.checked ? 'blue' : 'red'
        };
        console.log(rowStyle);
        return(
            <div className='onlineUser' onClick={this.handleToUser.bind(this)} style={rowStyle}>
                <img src='../img/1.jpeg'>&nbsp;&nbsp;{this.props.userName}</img>
            </div>
        )
    }
}
