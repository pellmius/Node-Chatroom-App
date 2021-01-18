// Requirements
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const db = require('./db/connection');
const apiRoute = require('./routes/api')

// Environment Variables and App Configurations
dotenv.config();
db();
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Routes
app.use('/api',apiRoute);
//

// Misc (Temp)

io.on('connection', socket => {
    console.log("New Socket Connection!")
    socket.on('chat message', msg => {
        console.log(msg);
    })
    socket.on('disconnect', () => {
        console.log('A user disconnected.')
    })
})
server.listen(PORT, (err) => {
    if (err){
        console.log(err)
    }
    console.log(`App running at localhost:${PORT}`)
})