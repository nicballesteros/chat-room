const mongoose = require('mongoose');

const MessageThreadSchema = new mongoose.Schema({
    messages: Array,
    users: Array,
});

mongoose.model('MessageThread', MessageThreadSchema, 'messageThreads');