const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
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
    active: {
        type: Boolean,
        default: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', UserSchema);