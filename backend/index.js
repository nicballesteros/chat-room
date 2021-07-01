//Nic Ballesteros
//Created 6/13/21

//Initialize the connection to the mongodb server.
const mongo = require('./db/mongo.js');

//Configure the db schemas.
require('./db/models/user');
require('./db/models/messageThread');

//Require what is necessary for the express app.
const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');

const passport = require('passport');

let jwtStrategy = require('./auth/passport');

jwtStrategy.passportApplyJWTMiddleware(passport);

//Set the port that the server will run on.
const PORT = 3000;

//Create a new express app.
let app = express();

const socketio = require('socket.io');
const { saveMessageToDatabase } = require('./db/utils.js');

// const http = require('http');
let server = require('http').Server(app);

//TODO put this all in a seperate file for clenliness.

let io = socketio(server, {
    path: '/api/socket.io',
    cors: { origin: '*' },
});

io
    .of('/api/messagesocket')
    .on('connection', (socket) => {
    console.log('user is connected');
    socket.on('thread', (thread) => {
        socket.thread = thread;
        socket.join(thread);
    });

    socket.on('message', async (message) => {
        //If this socket does not have a thread before messages are sent, don't 
        //keep those messages.
        if (socket.thread === null) {
            return;
        }

        socket.join(message.threadId);

        //TODO handle message.auth token authorization. Make sure that the user
        //can actually access this service.

        if (socket.thread === message.threadId) {
            console.log(message);
            let databaseMessageObject = await saveMessageToDatabase(message.message, message.threadId, message.username);

            socket.to(message.threadId).emit('message', databaseMessageObject);
        } else {
            console.error('there has been a grave error');
        }
    })
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use(passport.initialize());

//Use the predefined routes for the backend.
app.use('/api', routes);

//Listen to the port PORT and send requests to the routes.
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});