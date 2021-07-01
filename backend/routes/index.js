//Nic Ballesteros
//Created 6/17/21

const express = require('express');
const router = express.Router();

const passport = require('passport');

const userRoutes = require('./api/user/routes');
// const messageRoutes = require('./api/message/messagesocket');

router.use((req, res, next) => {
    console.log(`API Endpoint: '${req.url}' Time: ${Date.now()}`);
    next();
});

router.use('/user', userRoutes);

// router.use('/message', messageRoutes);

//Base API Endpoints.
router.post('/register', require('./api/register'));
router.post('/login', require('./api/login'));
router.get('/protected', passport.authenticate('jwt', { session: false }), require('./api/protected'));

router.get('/getthreaddata', passport.authenticate('jwt', { session: false }, require('./api/getThreadData')))

// router.get('/api/user/threads');

module.exports = router;