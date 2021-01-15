// Requirements
const express = require('express');
const io = require('socket.io');

require('dotenv').config()

// Environment Variables and App Configurations

const PORT = process.env.PORT || 8000;
console.log(PORT)
const app = express();


//Routes


app.listen(PORT, (err) => {
    if (err){
        console.log(err)
    }
    console.log(`App running at localhost:${PORT}`)
})