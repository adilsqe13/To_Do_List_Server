const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('tasks', UserSchema);