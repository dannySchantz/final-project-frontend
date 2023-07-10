<script>
    import { onMount } from 'svelte';
    import {GOOGLE_MAP_API} from '$env/static/public'
  
    let x;
    let map;
    let currentLocMarker;
    let redMarker;
    let directionsService = null;
    let directionsRenderer = null;
  
    function findCity() {
      const city = document.getElementById('city').value;
      console.log(city);
  
      const geocodingUrl =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        encodeURIComponent(city) +
        `&key=${GOOGLE_MAP_API}`;
  
      fetch(geocodingUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            const latitude = location.lat;
            const longitude = location.lng;
            const coordinates = 'Latitude: ' + latitude + '<br>Longitude: ' + longitude;
            document.getElementById('cityCoordinates').innerHTML = coordinates;
            const cityLatLng = new google.maps.LatLng(latitude, longitude);
            placeMarker(cityLatLng);
            map.setZoom(10);
          } else {
            document.getElementById('cityCoordinates').innerHTML = 'Coordinates not found for the country.';
          }
        })
        .catch(function (error) {
          console.log(error);
          document.getElementById('cityCoordinates').innerHTML = 'An error occurred while fetching coordinates.';
        });
    }
  
    function findCountry() {
      const country = document.getElementById('country').value;
      console.log(country);
  
      const geocodingUrl =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        encodeURIComponent(country) +
        `&key-${GOOGLE_MAP_API}`;
  
      fetch(geocodingUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            const latitude = location.lat;
            const longitude = location.lng;
            const coordinates = 'Latitude: ' + latitude + '<br>Longitude: ' + longitude;
            document.getElementById('countryCoordinates').innerHTML = coordinates;
            const countryLatLng = new google.maps.LatLng(latitude, longitude);
            placeMarker(countryLatLng);
            map.setZoom(4);
          } else {
            document.getElementById('countryCoordinates').innerHTML = 'Coordinates not found for the country.';
          }
        })
        .catch(function (error) {
          console.log(error);
          document.getElementById('countryCoordinates').innerHTML = 'An error occurred while fetching coordinates.';
        });
    }
  
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        x.innerHTML = 'Geolocation is not supported by this browser.';
      }
    }
  
    function showPosition(position) {
      x.innerHTML =
        'Latitude: ' +
        position.coords.latitude +
        '<br>Longitude: ' +
        position.coords.longitude;
  
      const mapProp = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 15,
      };
  
      map.setOptions(mapProp);
  
      google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
      });
  
      placeCurrentLocationMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }
  
    function placeCurrentLocationMarker(location) {
      if (currentLocMarker) {
        currentLocMarker.setMap(null);
      }
  
      currentLocMarker = new google.maps.Marker({
        position: location,
        map: map,
      });
  
      map.setCenter(location);
    }
  
    function placeMarker(location) {
      if (redMarker) {
        redMarker.setMap(null);
      }
  
      redMarker = new google.maps.Marker({
        position: location,
        map: map,
      });
  
      map.setCenter(location);
  
      calculateDistanceAndDuration(currentLocMarker.getPosition(), redMarker.getPosition());
    }
  
    function calculateDistanceAndDuration(origin, destination) {
      if (!directionsService) {
        return;
      }
  
      directionsRenderer.setMap(map);
      const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };
  
      directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          const distance = result.routes[0].legs[0].distance.text;
          const duration = result.routes[0].legs[0].duration.text;
  
          document.getElementById('distance').innerHTML = 'Distance: ' + distance;
          document.getElementById('duration').innerHTML = 'Duration: ' + duration;
  
          directionsRenderer.setDirections(result);
        }
      });
    }
  
    function addMarker() {
      const userLat = document.getElementById('userLatitude').value;
      const userLng = document.getElementById('userLongitude').value;
  
      const userLatLng = new google.maps.LatLng(userLat, userLng);
      placeMarker(userLatLng);
    }
  
    onMount(() => {
      function initMap() {
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
  
        const mapProp = {
          center: new google.maps.LatLng(0, 0),
          zoom: 15,
        };
  
        map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
        directionsRenderer.setMap(map);
  
        getLocation(); // Call getLocation after initializing the map
      }
  
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap; // Call initMap once the script is loaded
      document.head.appendChild(script);
    });
  </script>
  
  <style>
    #googleMap {
      width: 100%;
      height: 400px;
    }
  </style>
  
  <h1>Document</h1>
  
  <p bind:this="{x}"></p>
  <div id="googleMap"></div>
  <p id="distance"></p>
  <p id="duration"></p>
  <p>Latitude</p>
  <input type="number" id="userLatitude" />
  <p>Longitude</p>
  <input type="number" id="userLongitude" />
  <button on:click="{addMarker}">Add marker</button>
  <br />
  <br />
  <p>Country</p>
  <input type="text" id="country" />
  <button on:click="{findCountry}">Find Country</button>
  <p id="countryCoordinates"></p>
  <p>City</p>
  <input type="text" id="city" />
  <button on:click="{findCity}">Find City</button>
  <p id="cityCoordinates"></p>
  