// Requirements
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const db = require('./db/connection');
const apiRoute = require('./routes/api');
const path = require('path');

// Environment Variables and App Configurations
dotenv.config();
db();
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {});

//Routes
app.use('/api',apiRoute);
//
app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

// Misc (Temp)

io.on('connection', socket => {
    console.log("New Socket Connection!")
    socket.on('join', room => {
        
        socket.join(room.roomname);
        console.log(socket.rooms, socket.id, socket.rooms.size, room.user);
        socket.broadcast.to(room.roomname).emit('message', {txt: `${room.user} has joined`, sender:"HiddenBot"})
    })
    
    socket.on('message', msg => {
        socket.broadcast.to(msg.roomname).emit('message', {txt: msg.txt, sender: msg.user})
    })
    


    socket.on('disconnecting', reason => {

    })
})
server.listen(PORT, (err) => {
    if (err){
        console.log(err)
    }
    console.log(`App running at localhost:${PORT}`)
})