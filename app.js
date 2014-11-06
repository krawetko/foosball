/**
 * Module dependencies
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('error-handler'),
    morgan = require('morgan'),
    routes = require('./routes'),
    MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
//    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments


MongoClient.connect('mongodb://localhost:27017/foosball', function(err, db) {
    "use strict";
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));

    // Application routes
    routes(app, db);

    app.listen(8000);
    console.log('Express server listening on port 8000');
});
