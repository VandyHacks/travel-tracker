# Travel-Tracker
Track various flights, buses, GPS streams etc and visualize on one convenient Javascript map

## Tech Used
* Leaflet.js for mapping
* Vanilla Javascript and HTML/CSS
* FlightAware API
* Firebase for storing UIDs and flights
     * A Trie stores this stuff on the frontend
* Node.js with Restler and Express for a server

## Setup
### Website
Use localhost (Python's SimpleHTTPServer works great) on the directory for whatever your favorite port is. Make sure to change `config.ports.allow` under `server/config.js` to that value. The map is currently setup to update every 30 seconds: you are free to change that. 
### Server
`npm install` in the directory then run `node endpoint.js`. Make sure to setup your `config.js` file appropriately. An example is provided to help you.
### Firebase
Setup your firebase with a key of `vals` and under it objects with pairs of this form: `UID: flightCode`. For example, it could look like this.
```json
{
  "vals" : [ {
    "C39" : "FFT1263"
  }, {
    "B7P" : "SKV7660"
  } ]
}
```
Future versions will allow the specification of which flight under that code.

## Authors
* **Ben Cooper** - [bencooper222](https://github.com/bencooper222)
* **John Valin** - [johnvalin](https://github.com/johnvalin)
* **Nash Zhou** - [Crystal-V](https://github.com/Crystal-V)

## License
MIT.