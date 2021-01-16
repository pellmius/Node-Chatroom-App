import {Component} from 'react';
import {instance as api} from '../../api/index.js';
import './Home.css'
import { io } from 'socket.io-client';
let socket = io('http://localhost');
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {roomList: []}
        this.change = this.change.bind(this);
    }
    componentDidMount() {
        api.get('/')
        .then( (response) => {
            const nameArray = response.data.map((room) => {
                return room.name;
            })
            this.setState({roomList: nameArray})

        })
        
    }
    change(event) {
        this.setState({selectedRoom:event.target.value})
    }
    render() {

        socket.emit('a','aaa')
        return(
            <div className='container'>
            <h1 className='app-name-h1'>The Hidden Chat</h1>
            <label className='label-text' htmlFor='rooms'>Select Room:</label>
            <br/>
            <select className='select-room' onChange = {this.change} name='rooms' id='rooms'>
                {this.state.roomList.map((roomName,index) => {
                    return <option key = {index} className='room-option' value={roomName}>{roomName.charAt(0).toUpperCase() + roomName.slice(1)}</option>
                })}
            </select>
            </div>
        )
    }
}

export default Home;
