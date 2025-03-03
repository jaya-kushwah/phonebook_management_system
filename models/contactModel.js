const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
require('../dbConnect');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    group: {
        type: String,
    },
    user_id: {
        type: ObjectId,
        required: true
    }
})

const contactModel = mongoose.model('contacts', userSchema);
module.exports = contactModel;