import React, {Component} from 'react'

export default class UserInfo extends Component {
    constructor(props) {
        super(props)
        // this.uploadImgClick = this.uploadImgClick.bind(this)
    }

    handleClick() {

    }

    // uploadImgClick() {
    //     console.log(this + ":this")
    // }

    chooseImg(event) {
        var file = event.target.files[0]
        if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            //监听文件读取结束后事件
            reader.onloadend = function (e) {
                // $("#"+num).attr("src",e.target.result);    //e.target.result就是最后的路径地址
                // console.log("file："+ e.target.result);
                document.getElementById('userAvatar').src = e.target.result;

            };
        }

    }


    render() {
        return (
            <div className='userBox'>
                <div className='userName'>{this.props.userName}</div>
                <div className='avatarBox'>
                    <img id='userAvatar' className='userAvatar' src='' alt='我是头像'
                         onClick={this.handleClick()}></img>
                    <input id='uploadImg' type='file'  onChange={this.chooseImg.bind(this)}/>
                </div>

            </div>
        )
    }
}
