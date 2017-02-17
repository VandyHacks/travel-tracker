var map = L.map('map-container').setView([39.833333, -98.583333], 5);
var sidebar = document.getElementById('sidebar');
var clients = new Trie();

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




function addLocation(jsonLocation) {
    loadJSON(jsonLocation, function(geoJson) {
        var geoData = JSON.parse(geoJson);
        var UID = geoData['properties']['name'];

        if (clients.get(UID) != null) {
            removeLocation(UID);
            console.log("remove");
        }


        if (geoData.properties) { // add the properties to the popup
            var popupString = '<div class="popup">';
            for (var k in geoData.properties) {
                var v = geoData.properties[k];
                popupString += k + ': ' + v + '<br />';
            }
            popupString += '</div>';

            var marker = L.marker(geoData['geometry']['coordinates']);
            marker.bindPopup(popupString);
            marker.addTo(map);

            clients.put(UID, marker);




            //    var textNode = document.createTextNode(geoData['properties']['name']);
            //  sidebar.appendChild(textNode);
        }
    });
}

function removeLocation(UID) {
    var toRemove = clients.get(UID);
    map.removeLayer(toRemove);
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