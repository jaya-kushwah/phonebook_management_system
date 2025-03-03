const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
require('../dbConnect');

const groupSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    Timestamp: true
})

const groupModel = mongoose.model('groups', groupSchema);
module.exports = groupModel;