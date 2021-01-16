import React, {Component} from 'react';
import './Room.css'

class Room extends Component {
    
    render() {
        console.log(this.props.match)
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
                        <textarea/>

                        <button className = 'send-message-btn'>Send</button>
                    </div>
                </div>
        )
    }
}

export default Room;