<script>
    export let data;
    import { goToPostPage } from '../../../../utils/auth.js';
    import { paginate, LightPaginationNav, DarkPaginationNav } from 'svelte-paginate'  
    import { onMount } from 'svelte';

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

</script>
<div class="flex justify-center text-3xl font-extrabold">Your Posts!</div>
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