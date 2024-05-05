const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    fullName : {
        type: String
    },
    age : {
        type: Number
    },
    city : {
        type: String
    },
    updateApiCalled : {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('users', UsersSchema);