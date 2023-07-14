<script>
  import { onMount } from 'svelte';
  import { PUBLIC_MAPS_API_KEY } from '$env/static/public'
  import {PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
  import { goToPostPage } from '../../../utils/auth';
  import { getTokenFromLocalStorage } from '../../../utils/auth.js';
  import { goto } from "$app/navigation"

  export let data;
  let accessToken = getTokenFromLocalStorage()
  let x;
  let map;
  let current;
  let currentLocMarker;
  let redMarker;
  let directionsService = null;
  let directionsRenderer = null;
  let mode;
  let countryName = reformatCountryName(data.post.country)

  function showTravelOptions() {
  const travelOptionsDiv = document.getElementById("travelOptionsDiv");
  travelOptionsDiv.style.display = "block";
  mode = "DRIVING"
  calcRoute();
}
  
  function reformatCountryName(countryName) {
    let reformattedName = countryName.replace(/-/g, ' ').replace(/\b(?!and)\w/g, letter => letter.toUpperCase());
  
    if (reformattedName === "Virgin Islands British") {
      reformattedName = "Virgin Islands, British";
    } else if (reformattedName === "Virgin Islands Us") {
      reformattedName = "Virgin Islands, U.S.";
    }
  
    return reformattedName;
    }


  function handleChange() {
    mode = document.getElementById("mode").value;

  }

  var postLocation = data.post.coordinates;
  console.log(postLocation)
  let postLat = parseFloat(postLocation.split(",")[0]);
  let postLong = parseFloat(postLocation.split(",")[1].trim());
  console.log(postLong)
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
  mode = document.getElementById("mode").value; 
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

    async function deletePost(postId) {
        console.log(postId)
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/posts/id/${postId}`,{
            method: 'DELETE',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${accessToken}`
            },
        })
        if (resp.status == 200) {
            goto('/')
            alert('Post Deleted Successfully.')
        } else {
            alert('Failed Delete Post!')
        }
        
    }
</script>

<style>
  #googleMap {
    height: 400px;
    width: 100%;
  }
</style>

<p bind:this="{x}"></p>


<div id="googleMap" class="w-11/12 mx-auto border-4 border-secondary rounded-lg"></div>

<button on:click={showTravelOptions} class="ml-16 my-10 btn">How to Get There?</button>

<div>
    
  <img src={data.post.file} alt="" class="flex mx-auto w-11/12 h-[60vh] object-cover rounded-lg rounded-b-none border-b-0 border-4 border-secondary" />
  <div class="text-center mx-auto w-11/12 flex justify-center border-4 border-secondary border-t-0">
    <div class="p-4 rounded-lg">
      <h1 class="font-extrabold text-3xl first-letter:uppercase">{data.post.title}</h1>
      <h1 class="font-extrabold text-2xl">{countryName}</h1>
      <h1 class="flex font-extrabold text-xl first-letter:uppercase text-center mt-5" style="font-family:Arial, Helvetica, sans-serif">{data.post.description}</h1>
      <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 w-full">
        <div class="mt-5 flex flex-col items-center">
          <div class="font-extrabold text-xl">Directions</div>
          <div class="first-letter:uppercase">{data.post.directions}</div>
        </div>
        <div class="mt-5 flex flex-col items-center">
          <div class="font-extrabold text-xl">Coordinates</div>
          <div id="travelOptionsDiv" style="display: none;">
            <strong>Mode of Travel: </strong>
            <select id="mode" class="my-2" on:change={calcRoute}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="TRANSIT">Transit</option>
            </select>
          </div>
          <p id="distance"></p>
          <p id="duration"></p>
          {data.post.coordinates}
        </div>
        <div class="mt-5 flex flex-col items-center">
          <div class="font-extrabold text-xl">Experiences</div>
          {#each data.post.tags as tag}
          <div class="first-letter:uppercase">{tag}</div>
          {/each}
        </div>
      </div>
      <button class="btn" on:click={deletePost(data.post.id)}>Delete Post</button>
    </div>
  </div>
</div>
