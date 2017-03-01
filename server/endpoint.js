var http = require('http');
var fs = require('fs');
var express = require('express')
var cors = require('cors');

//Lets define a port we want to listen to

var app = express()
app.use(cors({ origin: 'http://localhost:' + config.ports.allow }));



app.get('/', function(req, res) {

    getAllFlights(function(data) {
        console.log(JSON.stringify(data) + " h");
        res.send(data);
    });
    //  res.send(getAllFlights());
});

app.listen(config.ports.listen, function() {
    console.log('Example app listening on port ' + config.ports.listen)
})