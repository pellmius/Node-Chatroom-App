const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config('../.env');

const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USERNAME;
const connectionString = `mongodb+srv://pellmius:${dbPassword}@chatroom.sqc5v.mongodb.net/${dbUser}?retryWrites=true&w=majority`
module.exports = function() {
    console.log(dbUser,dbPassword)
    mongoose.connect(connectionString, {useNewUrlParser:true, useUnifiedTopology: true});
}