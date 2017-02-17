var map = L.map('map-container').setView([39.833333, -98.583333], 5);
var sidebar = document.getElementById('sidebar');
var clients = new Trie();

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var geojsonLayer = new L.GeoJSON(null, {
    onEachFeature: function(feature, layer) {
        if (feature.properties) {
            var popupString = '<div class="popup">';
            for (var k in feature.properties) {
                var v = feature.properties[k];
                popupString += k + ': ' + v + '<br />';
            }
            popupString += '</div>';
            layer.bindPopup(popupString, {
                maxHeight: 200
            });
        }
    }
});

map.addLayer(geojsonLayer);


function addLocation() {
    loadJSON('example.json', function(geoJson) {
        var geoData = JSON.parse(geoJson);
        console.log(geoData);

        if (geoData.properties) { // add the properties to the popup
            var popupString = '<div class="popup">';
            for (var k in geoData.properties) {
                var v = geoData.properties[k];
                popupString += k + ': ' + v + '<br />';
            }
            popupString += '</div>';



            L.marker(geoData['geometry']['coordinates']).addTo(map).bindPopup(popupString);


            //    var textNode = document.createTextNode(geoData['properties']['name']);
            //  sidebar.appendChild(textNode);
        }
    });
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