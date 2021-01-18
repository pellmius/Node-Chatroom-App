import React, {Component} from 'react';
import './Room.css'
import { io } from 'socket.io-client';
let socket = io('https://node-chat-guest.herokuapp.com/');

class Room extends Component {
    constructor() {
        super();
        this.msgContainerRef = React.createRef()
        this.state = {guestName : 'cccc' , usersConnected:1  , text: '', messages: [{type:'other', msgText:`Welcome to the room.`, sender:'HiddenBot'}] };
        this.changeText = this.changeText.bind(this);
        this.sendMessage = this.sendMessage.bind(this);


    }
    genRandomName() {
        let randomNumber = Math.floor(Math.random() * (9999-1+1) + 1);
        return "Guest" + randomNumber;
    }
    
    componentDidMount() {

          this.setState({guestName:this.genRandomName()} , () => {
            socket.emit('join', {roomname: this.props.match.params.roomname, user:  this.state.guestName});
            socket.on('message', (msg) => {
                this.msgContainerRef.current.scrollTop = this.msgContainerRef.current.scrollHeight;
                let msgsArray = this.state.messages
                this.setState({messages: [...msgsArray, {type:'other', msgText: msg.txt, sender:msg.sender}] });
                console.log("AAS")
                
            }); 
        }); 
    }
    

    changeText(event) {
        this.setState({text:event.target.value});
    }

    sendMessage() {
        let msgsArray = this.state.messages
        this.setState({messages: [...msgsArray, {type:'own', msgText: this.state.text, sender:this.state.guestname}] });
        socket.emit('message', {roomname: this.props.match.params.roomname, user:  this.state.guestName, txt:this.state.text})
    }
    
    render() {
        
        return(
                <div className='chat-container'>
                    <div className = 'room-name-container'>
                        {this.props.match.params.roomname}
                    </div>
                    <div className = 'messages-container' ref={this.msgContainerRef}>
                        {this.state.messages.map((msg,index) => {
                            console.log(msg)
                            if(msg.type === 'own') {
                                return(
                                   <div key = {index} className='message-own'>
                                    You: {msg.msgText}
                                   </div> 
                                )
                            } else {
                                return(
                                    <div key = {index} className='message-other'>
                                        {msg.sender} : {msg.msgText}
                                   </div> 
                                )
                            }
                                
                        })
                        }
                        
                        
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