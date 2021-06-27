const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    threads: Array,
    friends: Array,
    requests: Array,
});

mongoose.model('User', UserSchema, 'users');