var map = L.map('map-container').setView([39.833333, -98.583333], 5);
var sidebar = document.getElementById('sidebar');
var clients = new Trie();


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




function addLocation(point) {


    var UID = point['properties']['name'];
    console.log(clients.get(UID));
    if (clients.get(UID) != null) { // check if already on the map
        removeLocation(UID);
        console.log("remove");
    }


    if (point.properties) { // add the properties to the popup
        var popupString = '<div class="popup">';
        for (var k in point.properties) {
            var v = point.properties[k];
            popupString += k + ': ' + v + '<br />';
        }
        popupString += '</div>';

        var marker = L.marker(point['geometry']['coordinates']);
        marker.bindPopup(popupString);
        marker.addTo(map);

        clients.put(UID, marker);




        //    var textNode = document.createTextNode(geoData['properties']['name']);
        //  sidebar.appendChild(textNode);
    }
}

// LatLng object that looks like below 
// [43.11667, 131.90000]
function drawArc(start, end) {
    L.Polyline.Arc(start, end).addTo(map);

}

function removeLocation(UID) {
    var toRemove = clients.get(UID);
    map.removeLayer(toRemove);
}



function getData() {
    $.get("http://localhost:3000", function(data) {
        console.log(data);
        //   var formattedDataPoints = JSON.parse(data);

        //   console.log(arrayPoints);
        for (var i = 0; i < data.length; i++) {
            addLocation(data[i]);
        }
    });
}

function getDataEveryNseconds(seconds) {
    getData();
    setInterval(getData, seconds * 1000);
}

function loadJSON(location, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', location, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

getDataEveryNseconds(30); // feel free to not have this on