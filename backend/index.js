//Nic Ballesteros
//Created 6/13/21

const express = require('express');
const routes = require('./routes/index');

//Set the port that the server will run on.
const PORT = 3000;

//Create a new express app.
let app = express();

//Use the predefined routes for the backend.
app.use(routes);

//Listen to the port PORT and send requests to the routes.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});