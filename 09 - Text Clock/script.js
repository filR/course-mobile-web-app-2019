// http server with python3:
// python3 -m http.server

(function() {
    'use strict';
    
    const TIMES_URL = 'https://cdn.glitch.com/c1778fcf-8a44-4ce8-9e9b-760ce51798a3%2Ftimes.json?1558521840889';
    
    // TODO: update every minute
    
    // get JSON file
    const request = new XMLHttpRequest();
    request.addEventListener("load", transferComplete);
    request.open("GET", TIMES_URL);
    request.send();
    
    // on successful "get"
    function transferComplete() {
      console.log(request.status); // TODO: catch errors
      
      let data = JSON.parse(request.responseText);
      setTimeText(data);
    }
    
    // parse json data and set text
    function setTimeText(data) {
      let time = getCurrentTime();
      let timeObject = data[time][0]; // TODO: get random entry, not just first
      
      let timeString = timeObject.quote_first + 
          '<b>' + timeObject.quote_time_case + '</b>' +
          timeObject.quote_last;
      
      document.querySelector('h1').innerHTML = timeString;
      document.querySelector('#title').innerHTML = timeObject.title;
      document.querySelector('#author').innerHTML = timeObject.author;
    }
    
    // helper function to return current time as "05:17"
    function getCurrentTime() {
      let date = new Date();
      let h = pad( date.getHours() );
      let m = pad( date.getMinutes() );
      return h + '_' + m;
    }
    
    // helper function to convert "5" to "05"
    function pad(n) {
        return (n < 10 ? '0' : '') + n
    }
      
}());