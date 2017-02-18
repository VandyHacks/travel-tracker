//var util = require('util');
var restler = require('restler');
var firebase = require('firebase');
var firebasetools = require('firebase-tools');
var config = require('./config');


var currentResults = "yo";

// Initialize Firebase
firebase.initializeApp(config.firebase);
var database = firebase.database();
var ref = database.ref('vals');

ref.on('value', gotData, errData);

function gotData(data) {
    //console.log(data.val());
    var test = data.val();
    var keys = Object.keys(test);
    var values = Object.values(test);
    var rtn = {};
    //console.log(test);
    //console.log(keys[0]);
    for (var i = 0; i < keys.length; i++) {
        restler.get(config.flightaware.fxml_url + 'GetLastTrack', {
            username: config.flightaware.username,
            password: config.flightaware.apiKey,
            query: { ident: values[i] }
        }).on('success', function(result, response) {
            // util.puts(util.inspect(result, true, null));
            var trackingResults = result.GetLastTrackResult.data;
            var entry = trackingResults[trackingResults.length - 1];

            var latitude = entry.latitude;
            var longitude = entry.longitude;
            var timestamp = entry.timestamp;

            console.log("latitude: " + latitude + " longitude: " + longitude + " timestamp: " + timestamp);

            var key = 'Points';
            rtn[key] = []; // empty Array, which you can push() values into


            var data = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [latitude, longitude]
                },
                "properties": {
                    "name": "B7P",
                    "hasArrived": "who fucking knows",
                    "timeLeft": -1
                }
            };

            rtn[key].push(data);
            console.log(JSON.stringify(rtn));
        });




        // restclient.get(fxml_url + 'InFlightInfo', {
        // username: username,
        // password: apiKey,
        // query: {ident: 'AA3275'}
        // }).on('success', function(result, response) {
        // // util.puts(util.inspect(result, true, null));
        // var arrivalTime = result.InFlightInfoResult.arrivalTime;
        // // var actualarrivaltime = entry.actualarrivaltime;
        // // var estimatedarrivaltime = entry.estimatedarrivaltime;
        // // console.log("actualarrivaltime: " + actualarrivaltime + " estimatedarrivaltime: " + estimatedarrivaltime);
        // });
    }
    currentResults = rtn;
}

function errData(err) {
    console.log("error: " + err);
}

var http = require('http');
var fs = require('fs');
var express = require('express')
var cors = require('cors');

//Lets define a port we want to listen to

var app = express()
app.use(cors({ origin: 'http://localhost:' + config.ports.allow }));



app.get('/', function(req, res) {
    res.send(currentResults);
})

app.listen(config.ports.listen, function() {
    console.log('Example app listening on port ' + config.ports.listen)
})