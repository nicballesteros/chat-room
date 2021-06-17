//Nic Ballesteros
//Created 6/17/21

const express = require('express');
const router = express.Router();

const apiLogin = require('./api/api-login')

router.use((req, res, next) => {
    console.log(`API Endpoint: '${req.url}' Time: ${Date.now()}`);
    next();
});

router.get('/', (req, res) => {
    res.send('hello world');
});

router.get('/api/login', apiLogin);

module.exports = router;