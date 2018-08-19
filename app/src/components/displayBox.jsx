import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import RightDisplay from './rightDisplay'
import LeftDisplay from './leftDisplay'
//const socket = io.connect('http://localhost:3000');

export default class DisplayBox extends Component{
    constructor(props){
        super(props);

        // this.props.socket.on('sendToMyself',(data)=> {
        //     // console.log(data.message);
        //     // for(var i =0;i<data.message.length;i++){
        //     //     console.log("第"+i+"条数据："+data.message[i].message+"\n")
        //     // }
        //     this.setState({
        //         message:data.message,
        //         // fromUser:data[0].fromUser,
        //         // toUser:data[0].toUser,
        //         // time:data.time,
        //     })
        // })

    }
    componentDidMount(){
        //接收消息
        // socket.on('receiveMessage',function (info) {
        //     this.setState({
        //         message:info.message,
        //         fromUser:info.fromUser,
        //         toUser:info.toUser,
        //         time:info.time,
        //
        //     })
        // })

        // this.props.socket.on('sendToMyself',function (data) {
        //
        // })
    }

    render(){
        return(
            <div className='displayBox'>
                {
                    this.props.message.map((item ,index)=>{
                        console.log('ja',this.props.userName)
                        if(item.fromUser == this.props.userName){
                            return <RightDisplay message={item.message}  />
                        }else{
                            return <LeftDisplay message={item.message}  />
                        }
                    })
                }

                {/*<LeftDisplay message={this.state.message}/>*/}
                </div>
        )
    }
}