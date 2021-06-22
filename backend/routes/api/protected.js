//Nic Ballesteros
//Created 06/18/21

const mongoose = require('mongoose');
const User = require('mongoose').model('User');

const utils = require('../../auth/utils');

module.exports = async (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'You are authenticated',
    });
};