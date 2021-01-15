// Requirements
const express = require('express');
const io = require('socket.io');

const dotenv = require('dotenv');


// Environment Variables and App Configurations
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();


//Routes


app.listen(PORT, (err) => {
    if (err){
        console.log(err)
    }
    console.log(`App running at localhost:${PORT}`)
})