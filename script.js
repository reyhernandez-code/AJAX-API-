

var apiKey = '21c6c37387e9f1dc47fc75a289e68291'; //Default API key after creating account

document.addEventListener('DOMContentLoaded', bindWeatherButton);

function bindWeatherButton(){
  document.getElementById('weatherSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {city:null,country:null,zip:null};


    payload.city = document.getElementById('city').value;
    payload.country = document.getElementById('country').value;
    payload.zip = document.getElementById('zip').value;

    //if a city value was input by user, use it along with Country Code to retrieve weather data
    if (payload.city){
        req.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${payload.city},${payload.country}&appid=${apiKey}`, true);
        req.addEventListener('load',function(){
            if (req.status >= 200 && req.status <= 400){
                var response = JSON.parse(req.responseText);
                document.getElementById('weatherResults').textContent = `The current weather in ${response.name} is ${response.weather[0].description} and feels like ${Math.floor((Number(response.main.feels_like)-273.15)*(1.8)+32)} degrees Fahrenheit.`;
            }
            else{
                console.log("Error in Network request: " + req.statusText);
            }
        })
        req.send(null);
        event.preventDefault();
    }

    
    //else, if the zip code was provided, use it along with the country code
    else if (payload.zip){
        req.open('GET', `http://api.openweathermap.org/data/2.5/weather?zip=${payload.zip},${payload.country}&appid=${apiKey}`, false);
        req.addEventListener('load',function(){
            if (req.status >= 200 && req.status <= 400){
                var response = JSON.parse(req.responseText);
                document.getElementById('weatherResults').textContent = `The current weather in ${response.name} is ${response.weather[0].description} and feels like ${Math.floor((Number(response.main.feels_like)-273.15)*(1.8)+32)} degrees Fahrenheit.`;
            }
            else{
                console.log("Error in Network request: " + req.statusText);
            }
        })
        req.send(null);
        event.preventDefault();
    }

    else{
      document.getElementById('weatherResults').textContent = `Something went wrong! Make sure to input a City or Zip Code.`;
      event.preventDefault();
    }
  })
}

    

document.addEventListener('DOMContentLoaded', bindTextSubmit);

      function bindTextSubmit(){
        document.getElementById('textSubmit').addEventListener('click', function(event){
          var req = new XMLHttpRequest();
          var payload = {text:null};
          payload.text = document.getElementById('anything').value;
          req.open('POST', 'http://httpbin.org/post', false);
          req.setRequestHeader('Content-Type', 'application/json');
          req.addEventListener('load',function(){
            if (req.status >= 200 && req.status <= 400){
                var response = JSON.parse(req.responseText);
                document.getElementById('anythingResults').textContent = `${payload.text}`;
            }
            else{
                console.log("Error in Network request: " + req.statusText);
            }
          })
          req.send(JSON.stringify(payload));
          event.preventDefault();
        })
      }