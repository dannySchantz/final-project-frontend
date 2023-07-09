<script>
    // export let data 
    import { goto } from '$app/navigation'    
    import Select from 'svelte-select';
    import { countries, tags } from './svelte-select-items.js'
    import { goToPostPage } from '../utils/auth.js';
    export let data;
    console.log(data)

    

    function searchTime(evt) {
      evt.preventDefault();


      const countryValue = evt.target['country'].value;
      const experienceValue = evt.target['experiences'].value;
      let countryParsedValue = ''
      let experienceParsedValue = ''
      if (countryValue) { 
        countryParsedValue = JSON.parse(countryValue).value
      }
      if (experienceValue) {
        experienceParsedValue = JSON.parse(experienceValue).value
      }
  
      const url = `/country-tag/${countryParsedValue}_${experienceParsedValue}`;

      if (!countryParsedValue) {
        goto(`/tags/${experienceParsedValue}`);
      } else if (!experienceParsedValue) {
        goto(`/country/${countryParsedValue}`);
      } else {
        goto(url);
      }
    }

</script>

<div class="flex justify-center items-center w-screen">
  <form class="relative w-full" on:submit={searchTime}>
    <img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" class="w-full h-[60vh]" />

    <!-- Text overlay -->
    <div class="absolute top-10 left-10 md:top-1/2 md:left-150 transform -translate-y-1/2 text-white text-lg bg-black bg-opacity-70 px-6 py-4 max-w-[470px] md:max-w-[470px] md:max-h-[270px] rounded-lg">
      <h1>Your text goes here.</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at efficitur purus, eu vestibulum est. Etiam luctus laoreet venenatis. Nullam pharetra scelerisque scelerisque.</p>
    </div>

    <!-- Search box with background -->
    <div class="absolute top-10 right-10 md:top-1/2 md:right-150 transform -translate-y-1/2 bg-black bg-opacity-70 w-[470px] md:w-[470px] h-[240px] px-6 py-4 flex flex-col items-center justify-center text-lg rounded-lg">
      <!-- Search input and button -->
      <!-- <input type="text" name="country"  placeholder="Country" class="w-full mb-2 px-4 py-2 text-lg rounded-lg text-gray-400" /> -->
      <!-- <input type="text" name="searchbox" placeholder="Country" class="w-full mb-2 px-4 py-2 text-lg bg-neutral" /> -->
      <!-- <button class="pb-2" on:click={() => searchable = !searchable}>Searchable: {searchable}</button> -->
      <div class="w-full mb-2">
        <Select items={countries} searchable={true} placeholder="Country" name="country" class="text-gray-500 dark:text-gray-400"/>
      </div>
      <div class="w-full mb-2">
        <Select items={tags} searchable={true} placeholder="Experiences" name="experiences" class="text-gray-500 dark:text-gray-400" />
      </div>
      
      <button class="form-submit search-button btn w-full py-2 px-4 rounded-md cursor-pointer text-lg">Search</button>
    </div>
  </form>
</div>




<div class="carousel w-full h-full carousel-center p-4 space-x-4 rounded-box">
  {#each data.posts as post}
      <button class="carousel-item relative w-[30%] hover:scale-[1.05] transition-transform duration-300" on:click={goToPostPage(post.id)}>
          <div class=" gap-10 mx-auto pt-10 pb-10 self-start">
              <div class="card w-fit bg-base-100 shadow-black shadow-lg">
                  <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
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
  {/each}
</div>



  



