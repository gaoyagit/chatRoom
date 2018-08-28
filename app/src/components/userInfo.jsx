import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';

export default class UserInfo extends Component {
    constructor(props) {
        super(props)
        // this.uploadImgClick = this.uploadImgClick.bind(this)
        // console.log("this.props:"+ Object.keys(this.props));
    }



    chooseImg(event) {
        var _this = this;
        var file = event.target.files[0]
        if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            //监听文件读取结束后事件
            reader.onloadend = function (e) {
                document.getElementById('userAvatar').src = e.target.result;
                // console.log("e.target.result:"+e.target.result)

                _this.props.userAvatarChange({
                    src:document.getElementById('userAvatar').src,
                })


            };
        }
        this.props.socket.emit('changeAvatar', {
            userName: this.props.userName,
            avatar: '',
        })

    }

    render() {
        return (
            <div className='userBox'>
                <div className='userName'>{this.props.userName}</div>
                <div className='avatarBox'>
                    <img id='userAvatar' className='userAvatar' src={this.props.userAvatar} alt='我是头像'></img>
                    <input id='uploadImg' type='file'  onChange={this.chooseImg.bind(this)}/>
                </div>

            </div>
        )
    }
}
