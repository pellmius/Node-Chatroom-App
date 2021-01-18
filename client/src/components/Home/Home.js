import {Component} from 'react';
import {instance as api} from '../../api/index.js';
import {Redirect} from 'react-router-dom';
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedRoom:'main', roomList: [], name:'', redirect: null}
        this.change = this.change.bind(this);
        this.changeName = this.changeName.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    genRandomName() {
        let randomNumber = Math.floor(Math.random() * (9999-1+1) + 1);
        return "Guest" + randomNumber;
    }
    componentDidMount() {

        api.get('/rooms')
        .then( (response) => {
            const nameArray = response.data.map((room) => {
                return room.name;
            })
            this.setState({roomList: nameArray})

        })
        this.setState({name:this.genRandomName()})
    }
    change(event) {
        this.setState({selectedRoom:event.target.value})
    }
    changeName(event) {

        this.setState({name:event.target.value})
    }
    redirect() {
        this.setState({redirect:`/room/${this.state.selectedRoom}`})
    }
    render() {
        if(this.state.redirect) {
            return <Redirect push to={{
                pathname:this.state.redirect,
                state: {guestName: this.state.name}
            }} />
        }
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
            <br/>
            <br/>
            <input onChange={this.changeName} placeholder='Type your username' type='text' className='name-input'></input>
            <br/>
            <button onClick={this.redirect} className='connect-btn'>Connect</button>
            </div>
        )
    }
}

export default Home;
