<script>
  import { onMount } from 'svelte';
  import { PUBLIC_MAPS_API_KEY } from '$env/static/public'
  import { goToPostPage } from '../../../utils/auth';
  export let data;
  let x;
  let map;
  let current;
  let currentLocMarker;
  let redMarker;
  let directionsService = null;
  let directionsRenderer = null;
  let mode = "DRIVING";


  function handleChange() {
    mode = document.getElementById("mode").value;
    console.log(mode);
  }

  var postLocation = data.post.coordinates;
  let postLat = parseFloat(postLocation.split(",")[0]);
  let postLong = parseFloat(postLocation.split(",")[1].trim());
  postLocation = postLat + "," + postLong;

  function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 15,
    };

    document.getElementById("mode").addEventListener("change", handleChange);

    map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    directionsRenderer.setMap(map);
    getLocation();
    findLocation(); // Call findCountry after initializing the map
    calcRoute(); // Calculate route after initializing the map
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  function showPosition(position) {
    current = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

    const mapProp = {
      center: current,
      zoom: 15,
    };

    map.setOptions(mapProp);

    google.maps.event.addListener(map, 'click', function (event) {
      placeMarker(event.latLng);
    });

    placeCurrentLocationMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  }

  function findLocation() {
    console.log(postLocation);
    const geocodingUrl =
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      encodeURIComponent(postLocation) +
      `&key=${PUBLIC_MAPS_API_KEY}`;

    fetch(geocodingUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status === 'OK' && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          const latitude = location.lat;
          const longitude = location.lng;
          const coordinates =
            'Latitude: ' + latitude + '<br>Longitude: ' + longitude;
          const countryLatLng = new google.maps.LatLng(latitude, longitude);
          placeMarker(countryLatLng);
          map.setZoom(15);
        } else {
          console.log('Coordinates not found for the country.');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
    location = new google.maps.LatLng(location.lat(), location.lng());
    if (redMarker) {
      redMarker.setMap(null);
    }

    redMarker = new google.maps.Marker({
      position: location,
      map: map,
    });

    map.setCenter(location);
  }

  function calcRoute() {
  if (current && redMarker) {
    const request = {
      origin: current,
      destination: redMarker.getPosition(),
      travelMode: google.maps.TravelMode[mode],
    };

    directionsService.route(request, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const route = result.routes[0];
        const distance = route.legs[0].distance.text;
        const duration = route.legs[0].duration.text;

        document.getElementById('distance').textContent = 'Distance: ' + distance;
        document.getElementById('duration').textContent = 'Duration: ' + duration;
      } else {
        console.log('Error calculating the route.');
      }
    });
  }
}


  onMount(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap; // Assign the initMap function to the global scope
    document.head.appendChild(script);
  });

</script>

<style>
  #googleMap {
    margin-top: 30px;
    width: 100%;
    height: 400px;
  }
</style>

<p bind:this="{x}"></p>

<div>
  <strong>Mode of Travel: </strong>
  <select id="mode"  on:change={calcRoute}>
    <option value="DRIVING">Driving</option>
    <option value="WALKING">Walking</option>
    <option value="BICYCLING">Bicycling</option>
    <option value="TRANSIT">Transit</option>
  </select>
</div>

<div id="googleMap"></div>
<p id="distance"></p>
<p id="duration"></p>

<div>
  <img src={data.post.file} alt="" class="flex mx-auto w-11/12 h-[60vh] object-cover rounded-lg border-accent border-4" />
  <div class="flex mx-auto w-11/12 text-center">
    <div class="p-4 border-4 border-accent rounded-lg">
      <h1 class="font-extrabold text-3xl first-letter:uppercase">{data.post.title}</h1>
      <h1 class="font-extrabold text-2xl">{data.post.country}</h1>
      <h1 class="font-extrabold text-xl text-justify first-letter:uppercase" style="font-family:Arial, Helvetica, sans-serif">{data.post.description}</h1>
      <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 w-full">
        <div class="mt-5 flex flex-col items-center">
          <div class="font-extrabold text-xl">Directions</div>
          <div class="first-letter:uppercase">{data.post.directions}</div>
        </div>
        <div class="mt-5 flex flex-col items-center">
          <div class="font-extrabold text-xl">Coordinates</div>
          {data.post.coordinates}
        </div>
        <div class="mt-5 flex flex-col items-center">
          <div class="font-extrabold text-xl">Experiences</div>
          {#each data.post.tags as tag}
          <div class="first-letter:uppercase">{tag}</div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
