var restler = require('restler');
var firebase = require('firebase');
var firebasetools = require('firebase-tools');
var config = require('./config');
var async = require('async');

var exports = module.exports = {};


var clients;



function initializeFirebase() {
    firebase.initializeApp(config.firebase);
    var database = firebase.database();
    var ref = database.ref('vals');

    ref.on('value', function(data) {
        clients = data.val();
        console.log(clients);

    }, errData);
}
// Initialize Firebase
initializeFirebase();


exports.getAllFlights = function(getRequest) {
    //console.log(data.val());
    //clients = data.val();



    async.map(clients, getFlight, function(err, results) {
        getRequest(results);
    });



    /*
        var keys = Object.keys(clients);
        var values = Object.values(clients);

        var numKeys = keys.length;

        var rtn = {};
        rtn['Points'] = [];




        for (var i = 0; i < keys.length; i++) {

            var complete = false;
            getFlight(keys[i], values[i], function(data) {
                rtn['Points'].push(data);
            });

            //  rtn['Points'].push(getFlight(keys[i], values[i]));


        }

    */
}

// uses flightaware api to get the flight 
// returns GEOJson with information
// identifier should be in the format {uid:flight code}
function getFlight(identifier, callback) {



    var rtn = {};
    restler.get(config.flightaware.fxml_url + 'GetLastTrack', {
        username: config.flightaware.username,
        password: config.flightaware.apiKey,
        query: { ident: identifier }
    }).on('success', function(result, response) {
        // util.puts(util.inspect(result, true, null));
        var trackingResults = result.GetLastTrackResult.data;
        var entry = trackingResults[trackingResults.length - 1];

        var latitude = entry.latitude;
        var longitude = entry.longitude;
        var timestamp = entry.timestamp;

        //   console.log("latitude: " + latitude + " longitude: " + longitude + " timestamp: " + timestamp);

        rtn = { // GeoJSON format
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [latitude, longitude]
            },
            "properties": {
                "name": "eh",
                "hasArrived": "who fucking knows",
                "timeLeft": -1
            }
        };

        // rtn[key].push(data);
        console.log(JSON.stringify(rtn));
        return callback(null, rtn);
    });


}

function errData(err) {
    console.log("error: " + err);
}