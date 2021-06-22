//Nic Ballesteros
//Created 6/17/21

const express = require('express');
const router = express.Router();

const passport = require('passport');

router.use((req, res, next) => {
    console.log(`API Endpoint: '${req.url}' Time: ${Date.now()}`);
    next();
});

router.get('/', (req, res) => {
    res.send('hello world');
});

router.post('/api/register', require('./api/register'));
router.post('/api/login', require('./api/login'));
router.get('/api/protected', passport.authenticate('jwt', { session: false }), require('./api/protected'));

module.exports = router;