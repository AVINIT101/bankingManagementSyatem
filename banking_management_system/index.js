const express = require('express');
const bodyParser = require('body-parser');



// create express app
const app = express();
const logger = require('./log'); 
const morgan = require('morgan');


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
const dbConfig = require('./config/index.js');
const mongoose = require('mongoose');
const routes = require('./Routes');

app.use(morgan('combined', { stream: logger.httpStream }));

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
module.exports = app;
app.use('', routes);
