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

require('./auth/passport')(passport);
//Set the port that the server will run on.
const PORT = 3000;

//Create a new express app.
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use(passport.initialize());

//Use the predefined routes for the backend.
app.use('/api', routes);

//Listen to the port PORT and send requests to the routes.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});