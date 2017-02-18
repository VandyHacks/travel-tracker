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

ref.on('value', getData, errData);

function getData(data) {
    //console.log(data.val());
    var test = data.val();
    var keys = Object.keys(test);
    var values = Object.values(test);
    var rtn = {};

    for (var i = 0; i < keys.length; i++) {
        rtn['Points'] = [];
        rtn['Points'].push(getFlight(keys[i], values[i]));
        // console.log(JSON.stringify(rtn));
    }
    currentResults = rtn;
}

// uses flightaware api to get the flight 
// returns GEOJson with information
function getFlight(uid, flightCode) {
    var rtn = {};
    restler.get(config.flightaware.fxml_url + 'GetLastTrack', {
        username: config.flightaware.username,
        password: config.flightaware.apiKey,
        query: { ident: flightCode }
    }).on('success', function(result, response) {
        // util.puts(util.inspect(result, true, null));
        var trackingResults = result.GetLastTrackResult.data;
        var entry = trackingResults[trackingResults.length - 1];

        var latitude = entry.latitude;
        var longitude = entry.longitude;
        var timestamp = entry.timestamp;

        console.log("latitude: " + latitude + " longitude: " + longitude + " timestamp: " + timestamp);

        rtn = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [latitude, longitude]
            },
            "properties": {
                "name": uid,
                "hasArrived": "who fucking knows",
                "timeLeft": -1
            }
        };

        // rtn[key].push(data);
        console.log(JSON.stringify(rtn));
    });

    return rtn;
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