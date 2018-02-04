'use strict';

// Example response:

// [
//   {
//     "id": "string",
//     "lin": "string",
//     "name": "string",
//     "status": "under construction",
//     "geolocation": "string",
//     "location": "string",
//     "street_address": "string",
//     "city": "string",
//     "state": "string",
//     "zip_code": "string",
//     "pay_to_park": true,
//     "meters": [
//       {
//         "id": "string",
//         "oem": "ekm",
//         "station_id": "string",
//         "state": "idle"
//       }
//     ],
//     "completion_date": "2017-11-28"
//   }
// ]


(function displayStations() {
  let promise = requestData('https://api.voltaapi.com/v1/stations', 'GET');

  promise
    .then(response => {
      // Extract returned JSON & parse into JS objects
      const parsedList = JSON.parse(response);
      // console.log('Here is parsed list:');
      // console.log(parsedList);
      // console.log('Parsed list length: ', parsedList.length);

      // Valid station status values: 
      // - status=a (active) - status=ns (needs service) - status=uc (under construction)
      // const uniqueStatus = [...new Set(parsedList.map(station => station.status))];
      // console.log('Unique status`: ', uniqueStatus);
      const activeStations = parsedList.filter(station => station.status === 'active');
      console.log('`Active` stations - size: ', activeStations.length);
      console.log('`Needs service` stations - size: ', parsedList.filter(station => station.status === 'needs service').length)
      console.log('`Under construction` stations - size: ', parsedList.filter(station => station.status === 'under construction').length);

    })
    .catch(err => console.log('An error occurred.', err));
})();

function requestData(url, method = 'GET') {
  // Create & return a Promise with callback function that creates XMLHttpRequest
  return new Promise(
    (resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url); // initialize request, defaults to async
      xhr.setRequestHeader('Accept', 'application/json'); // set acceptable response content type

      xhr.onload = function() {
        // if request was successful, fulfill Promise, else reject Promise
        if (this.status >= 200 && this.status < 300) { // request was successful
          resolve(this.response);
        } else {
          reject(new Error({
            status: this.status,
            responseText: this.responseText
          }));
        }
      };

      xhr.onerror = function() {
        reject(new Error({
          status: this.status,
          responseText: this.responseText
        }));
      };

      xhr.send();
    }
  );
}
