// Requirements
const express = require('express');
const io = require('socket.io');
const dotenv = require('./config_env')

// Environment Variables and App Configurations

const PORT = process.env.PORT || 8000;
const app = express();


//Routes


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`App running at localhost:${PORT}`)
})