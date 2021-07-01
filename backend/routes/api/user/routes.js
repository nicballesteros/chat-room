//Nic Ballesteros
//Created 6/25/21

const express = require('express');
const router = express.Router();

const passport = require('passport');

router.post('/exists', passport.authenticate('jwt', { session: false }), require('./exists'));

router.post('/newthread', passport.authenticate('jwt', { session: false }), require('./newThread'));

router.get('/getthreads', passport.authenticate('jwt', { session: false }), require('./getThreads'));

router.get('/getuser', passport.authenticate('jwt', { session: false }), require('./getUser'));

module.exports = router;