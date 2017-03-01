var http = require('http');
var fs = require('fs');
var express = require('express')
var cors = require('cors');

var config = require('./config');
var tracker = require('./flight_tracker.js')

//Lets define a port we want to listen to

// figure out: http://stackoverflow.com/questions/16866015/node-js-wait-for-callback-of-rest-service-that-makes-http-request

var app = express()
app.use(cors({ origin: 'http://localhost:' + config.ports.allow }));



app.get('/', function(req, res) {

    tracker.getAllFlights(function(data) {
        //  console.log(JSON.stringify(data) + " h");
        res.send(data);
    });
    //  res.send(getAllFlights());
});

app.listen(config.ports.listen, function() {
    console.log('Example app listening on port ' + config.ports.listen)
})