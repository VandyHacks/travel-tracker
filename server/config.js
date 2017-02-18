var config = {};

//setup parts to config
config.firebase = {};
config.flightaware = {};
config.ports = {};

//firebase
config.firebase.apiKey = "AIzaSyCzrfmtFmJUziFbqiHXVWqnCXEdvJipZJE";
config.firebase.authDomain = "travel-tracker-2e433.firebaseapp.com";
config.firebase.databaseURL = "https://travel-tracker-2e433.firebaseio.com";
config.firebase.storageBucket = "travel-tracker-2e433.appspot.com";
config.firebase.messagingSenderId = "737416410832";

//flightaware
config.flightaware.fxml_url = "http://flightxml.flightaware.com/json/FlightXML2/";
config.flightaware.username = "frankpbos";
config.flightaware.apiKey = "04b25d72aa3980bff44ab39ec8c19d1d62ed5c20";

//ports
config.ports.listen = 3000;
config.ports.allow = 8078;

module.exports = config;