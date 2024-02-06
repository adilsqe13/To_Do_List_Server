const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    usename: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', UserSchema);