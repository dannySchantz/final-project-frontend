<script>
    // import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { PUBLIC_MAPS_API_KEY } from '$env/static/public'
    import { goToPostPage } from '../../../utils/auth.js';
    import { paginate, LightPaginationNav, DarkPaginationNav } from 'svelte-paginate'  

    export let data;
    let currentTheme = localStorage.getItem('theme')
    let posts = data.posts;
    let currentPage = 1;
    let pageSize = 3;
    $: paginationData = paginate({ items: posts, pageSize, currentPage });

    onMount(() => {
      const interval = setInterval(() => {
        currentTheme = localStorage.getItem('theme');
      }, 50);

      return () => {
        clearInterval(interval);
      };
    });

    
    
    const country =  data.reformattedCountryName

    let map;
    let directionsService = null;
    let directionsRenderer = null;
    let redMarker;


    function findCountry() {
        console.log(country);
        const geocodingUrl =
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            encodeURIComponent(country) +
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
                    map.setZoom(4);
                } else {
                    console.log('Coordinates not found for the country.');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
    }

    function initMap() {
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();

        const mapProp = {
            center: new google.maps.LatLng(0, 0),
            zoom: 15,
        };

        map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
        directionsRenderer.setMap(map);

        findCountry(); // Call findCountry after initializing the map
    }

    onMount(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap; // Assign the initMap function to the global scope
        document.head.appendChild(script);
    });



//     // console.log(data)
//     // let slug = pa
//     // function checkForTags(tagsArray, currentTag) {
//     //     for (let i = 0; i < tagsArray.length; i++) {
//     //         if (tagsArray[i] === currentTag) {
//     //             return true
//     //         }
            
//     //     }
//     //     return false
//     // }
    
</script>



<div id="googleMap"></div>

<div class="w-2/3 align-middle ml-[16.3333333%]">
    <div class="text-center font-extrabold text-3xl mt-5 first-letter:uppercase">{data.slug}</div>
    <!-- <div class="text-center mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere, quasi atque nulla vel quisquam quibusdam voluptatibus voluptate labore nesciunt adipisci soluta maxime temporibus corporis dicta, nihil et voluptatem eius.</div> -->
  </div>
  
  <div class="carousel w-full h-full justify-between p-10 space-x-4 rounded-box" id="myCarousel">
    {#each paginationData as post}
      <button class="carousel-item relative w-[30%] hover:scale-[1.05] transition-transform duration-300 " on:click={() => goToPostPage(post.id)}>
        <div class="gap-10 mx-auto pt-10 pb-10 self-start">
          <div class="card w-full h-[400px] bg-base-100 shadow-black shadow-lg">
            <figure><img src={post.file} alt="hi" /></figure>
            <div class="card-body h-[60%] overflow-hidden">
              <h2 class="card-title text-xl font-bold mb-2">{post.title}</h2>
              <p class="flex justify-self-start text-justify">{post.description}</p>
              </div> 
          <div class="card-actions justify-start flex flex-wrap p-2">
                {#each post.tags as tag}
                  <div class="badge-primary badge mr-2">{tag}</div>
                {/each}
              </div>
            </div>
          </div>
      </button>
    {/each}
  </div>
  {#if currentTheme == 'dracula'}
  <DarkPaginationNav
    totalItems={data.posts.length}
    pageSize={pageSize}
    currentPage={currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => currentPage = e.detail.page}
  />
  {/if}
  
  {#if currentTheme == 'autumn'}
  <LightPaginationNav
    class="bg-base-100"
    totalItems={data.posts.length}
    pageSize={pageSize}
    currentPage={currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => currentPage = e.detail.page}
  />
  {/if}
  
<style>

:global(.svelte-select-list) {
    --tw-bg-opacity: 1 !important;
    background-color: hsl(var(--b1) / var(--tw-bg-opacity)) !important;
}
:global(.light-pagination-nav) {
--tw-bg-opacity: 1 !important;
background-color: hsl(var(--b1) / var(--tw-bg-opacity)) !important;
}
:global(.pagination-nav) {
--tw-bg-opacity: 1 !important;
background-color: hsl(var(--b1) / var(--tw-bg-opacity)) !important;
box-shadow: none !important;
}

</style>
