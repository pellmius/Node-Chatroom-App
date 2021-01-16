const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
    name: String,
    description: String,
})

module.exports = mongoose.model('Room', roomSchema);