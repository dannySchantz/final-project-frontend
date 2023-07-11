<script>
    // import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { PUBLIC_MAPS_API_KEY } from '$env/static/public'
    import { goToPostPage } from '../../../utils/auth.js';
    export let data; 

    
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
    

//     </script>

<style>
    #googleMap {
        margin-top: 30px;
        width: 100%;
        height: 400px;
    }
</style>


<div id="googleMap"></div>
<div class="w-2/3 align-middle ml-[16.3333333%]">
    <div class="text-center font-extrabold text-3xl mt-5 first-letter:uppercase">{data.reformattedCountryName}</div>
    <!-- <div class="text-center font-extrabold text-3xl mt-5">{slug}</div> -->
    <div class="text-center mt-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere, quasi atque nulla vel quisquam quibusdam voluptatibus voluptate labore nesciunt adipisci soluta maxime temporibus corporis dicta, nihil et voluptatem eius.</div>
</div>
<!-- {#each data.posts.tags as tags, index} -->
<!-- <div class="font-extrabold ml-20 mt-10 text-2xl">{tags[index]}</div> -->
<div class="carousel w-full h-full carousel-center p-4 space-x-4 rounded-box">
    {#each data.posts as post}
        <!-- {#if checkForTags(post.tags, data.posts.tags[0])} -->
        <button class="carousel-item relative w-[30%] hover:scale-[1.05] transition-transform duration-300" on:click={goToPostPage(post.id)}>
            <div class=" gap-10 mx-auto pt-10 pb-10 self-start">
                <div class="card w-fit bg-base-100 shadow-black shadow-lg">
                    <figure><img src={post.file} alt="hi"/></figure>
                    <!-- <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure> -->
                    <div class="card-body">
                        <h2 class="card-title">{post.title}</h2>
                        <p class="flex justify-self-start">{post.description}</p>
                        <div class="card-actions justify-start flex flex-wrap">
                            {#each post.tags as tag}
                                <div class="badge-primary badge mr-2">{tag}</div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </button>
        <!-- {/if} -->
    {/each}
</div>


