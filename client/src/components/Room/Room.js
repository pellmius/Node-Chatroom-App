import React, {Component} from 'react';
import './Room.css'
import { io } from 'socket.io-client';
let socket = io(':80');

class Room extends Component {
    constructor() {
        super();
        this.state = {text:''};
        this.changeText = this.changeText.bind(this);
        this.sendMessage = this.sendMessage.bind(this);


    }

    changeText(event) {
        this.setState({text:event.target.value});
    }

    sendMessage() {
        socket.emit('chat message', this.state.text)
    }

    render() {
        return(
                <div className='chat-container'>
                    <div className = 'room-name-container'>
                        {this.props.match.params.roomname}
                    </div>
                    <div className = 'messages-container'>
                    </div>
                    <div className = 'sidebar-container'>
                    </div>
                    <div className='type-container'>
                        <textarea onChange = {this.changeText}/>

                        <button onClick = {this.sendMessage} className = 'send-message-btn'>Send</button>
                    </div>
                </div>
        )
    }
}

export default Room;