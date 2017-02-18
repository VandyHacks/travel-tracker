var config = {};

// setup parts to config
config.firebase = {};
config.flightaware = {};
config.ports = {};

// firebase - this is taken directly from Firebase docs
// note that you don't need all of these if you're only using one part of firebase
config.firebase.apiKey = "YOUR API KEY";
config.firebase.authDomain = "YOUR AUTHDOMAIN";
config.firebase.databaseURL = "URL OF YOUR DATABASE";
config.firebase.storageBucket = "YOUR STORAGEBUCKET";
config.firebase.messagingSenderId = "YOUR MESSAGING ID";

// flightaware
// god bless your soul if you decide to use this API
config.flightaware.fxml_url = "http://flightxml.flightaware.com/json/FlightXML2/";
config.flightaware.username = "YOUR USERNAME";
config.flightaware.apiKey = "YOUR APIKEY";

// ports
// these are just the dev settings
// the former is the port your frontend should make GET requests too
// The latter is the localhost of your frontend to allow for CORS
config.ports.listen = 3000;
config.ports.allow = 8078;

module.exports = config;