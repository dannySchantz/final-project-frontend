<script>
    export let data;
    import { goToPostPage } from '../../../utils/auth.js';
</script>

<div class="w-2/3 align-middle ml-[16.3333333%]">
    <div class="text-center font-extrabold text-3xl mt-5 first-letter:uppercase">{data.reformattedCountryName}</div>
    <div class="text-center mt-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere, quasi atque nulla vel quisquam quibusdam voluptatibus voluptate labore nesciunt adipisci soluta maxime temporibus corporis dicta, nihil et voluptatem eius.</div>
</div>
<div class="carousel w-full h-full carousel-center p-4 space-x-4 rounded-box">
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each data.posts as post}
          <button class="carousel-item relative w-full hover:scale-105 transition-transform duration-300" on:click={() => goToPostPage(post.id)}>
            <div class="p-4 bg-white rounded-lg shadow-md">
              <img class="w-full h-48 object-cover mb-4 rounded-lg" src={post.image} alt={post.title} />
              <h2 class="text-xl font-semibold mb-2">{post.title}</h2>
              <p class="text-gray-500 mb-4">{post.description}</p>
              <div class="flex flex-wrap">
                {#each post.tags as tag}
                  <div class="px-2 py-1 mr-2 mb-2 rounded-md bg-blue-200 text-blue-800 text-sm">{tag}</div>
                {/each}
              </div>
            </div>
          </button>
        {/each}
      </div>
</div>