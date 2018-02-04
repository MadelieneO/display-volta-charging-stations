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


(function requestData() {
  // Create Promise with callback function that creates XMLHttpRequest
  let promise = new Promise(
    function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.voltaapi.com/v1/stations'); // initialize request, defaults to async
      xhr.setRequestHeader('Accept',  'application/json'); // set acceptable response content type

      xhr.onload = function() {
        // if request was successful, fulfill Promise, else reject Promise
        if (this.status >= 200 && this.status < 300) { // request was successful
          resolve(xhr.response);
        } else {
          reject(new Error({
            status: this.status,
            responseText: xhr.responseText
          }));
        }
      };

      xhr.onerror = function() {
        reject(new Error({
          status: this.status,
          responseText: xhr.responseText
        }));
      };

      xhr.send();
    }
  );

  promise
    .then(response => {
      // Extract returned JSON & parse into JS objects
      const parsedList = JSON.parse(response);
      console.log('Here is parsed list:');
      console.log(parsedList);
    })
    .catch(err => console.log('An error occurred.', err));
})();
