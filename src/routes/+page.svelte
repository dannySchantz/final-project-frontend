<script>
    // export let data 
    import { goto } from '$app/navigation'    
    import Select from 'svelte-select';
    import { countries, tags } from './svelte-select-items.js'
    import { goToPostPage } from '../utils/auth.js';
    import { onMount } from 'svelte';
    import { paginate, DarkPaginationNav, LightPaginationNav } from 'svelte-paginate'  
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

<div class="flex justify-center items-center w-screen h-[60vh]">
  <form class="relative w-full" on:submit={searchTime}>
    <img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" class=" w-full h-[60vh]" />

    <!-- Text overlay -->
    <div class="absolute m-5 left-0 top-0 sm:justify-center sm:top-[30%] sm:self-center sm:left-10 sm:m-0 sm:w-[40%] text-white text-lg bg-black bg-opacity-70 px-6 py-4 rounded-lg w-fit sm:hidden md:block z-10 text-justify">
      <h1>DiscoverFy</h1>
      <p>Unlock extraordinary experiences worldwide with Discoverfy. Discover, explore, and create unforgettable memories. Embrace the joy of exploration.</p>
    </div>

    <!-- Search box with background -->
    <div class="absolute top-1/2 right-[30%] sm:absolute sm:top-[30%] sm:right-10 bg-black bg-opacity-70 w-[40%] px-6 py-4 flex flex-col items-center justify-center text-lg rounded-lg z-20">
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



<div class="flex justify-start text-2xl font-extrabold z-50 mt-10 ml-4 mb-0">Featured Posts</div>
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

@media (max-width: 414px) {
    .sm\:hidden {
        display: none;
    }
}
@media (min-width: 640px) {
    .md\:block {
        display: block;
    }
}
</style>
  



