//Lets require/import the HTTP module
var http = require('http');
var fs = require('fs');
var express = require('express')
var cors = require('cors');

//Lets define a port we want to listen to

var app = express()
app.use(cors({ origin: 'http://localhost:8079' }));



app.get('/', function(req, res) {
    fs.readFile("website/examples/multiple.json", 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})