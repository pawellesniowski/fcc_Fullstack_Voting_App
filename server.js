// Load in node modules //
var express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    router = require('./routes/api.js')

var app = express();

// Load in enviroment variables //
// require('dotenv').config();  or below:
dotenv.config({verbose: true});

// var dbPath = 'mongodb://localhost:27017/fcc-vote-app';
var dbPath = 'mongodb://username:password@ds157233.mlab.com:57233/voting-app';
var port = process.env.PORT || 5000;

// Connect to mongoDB, with mongoose //
mongoose.connect(dbPath);
// CONNECTION EVENTS:
// When successfully connected:
mongoose.connection.on('connected', function(){
    console.log('Mongoose default connection open to: ', dbPath);
});
// error in connection:
mongoose.connection.on('error', function(err){
    console.log('Mongoose default connection error, fail to conect to: ', dbPath, err);
});
// When the connection is disconnected:
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose default connection disconnected successfully');
});
// end of mongoose configuration //

// Configure express middleware //
app.use(morgan('dev')); // HTTP logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public')); // makes start app from file from public directory
app.use('/api', router)
// first router: 
app.get("*", function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

// Start up server //
app.listen(port, function(){
    console.log("App is running on port ", port);
});

// checking .env //
console.log(process.env.secret);



