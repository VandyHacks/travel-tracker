# Travel-Tracker
Track various flights, buses, GPS streams etc and visualize on one convenient Javascript map

## Tech  Used
* Leaflet.js for mapping
* Vanilla Javascript and HTML/CSS
* FlightAware API
* Firebase for storing UIDs and flights
* Node.js with Restler and Express for a server


## Setup
### Website
Use localhost (Python's SimpleHTTPServer works great) on the directory for whatever your favorite port is. Make sure to change `config.ports.allow` under `server/config.js` to that value.
### Server
`npm install` in the directory then run `node apitest.js`. Note that server is likely to undergo very active development in the near future so this will become a less stupid process.
### Firebase
Setup your firebase with a key of `vals` and under it pairs of `UID: flightCode`. For example, it could look like this.
```json
{
  "vals" : {
    "B7P" : "UAL1914"
  }
}
```
Future versions will allow the specification of which flight under that code.

## Authors
* **Ben Cooper** - [bencooper222](https://github.com/bencooper222)
* **John Valin** - [johnvalin](https://github.com/johnvalin)
* **Nash Zhou** - [Crystal-V](https://github.com/Crystal-V)

## License
MIT.