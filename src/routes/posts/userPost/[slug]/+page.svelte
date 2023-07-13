<script>
    export let data;
    import { goToPostPage } from '../../../../utils/auth.js';
    import {paginate, DarkPaginationNav} from 'svelte-paginate';

    let posts = data.posts;
    let currentPage = 1;
    let pageSize = 3;
    $: paginationData = paginate({ items: posts, pageSize, currentPage });

</script>
<div class="flex justify-center text-3xl font-extrabold">Your Posts!</div>
<div class="grid sm:grid-cols-2 md:grid-cols-3 w-full h-full carousel-center p-4 gap-4 rounded-box">
    {#each paginationData as post}
        <!-- {#if checkForTags(post.tags, data.posts.tags[0])} -->
        <button class=" relative hover:scale-[1.05] transition-transform duration-300" on:click={goToPostPage(post.id)}>
            <div class=" gap-10 mx-auto pt-10 pb-10 self-start">
                <div class="card w-full bg-base-100 h-[400px] shadow-black shadow-lg">
                    <figure><img src={post.file} alt="hi"/></figure>
                    <!-- <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure> -->
                    <div class="card-body h-[60%] overflow-hidden">
                        <h2 class="card-title text-xl font-bold mb-2">{post.title}</h2>
                        <p class="flex justify-self-start text-justify">{post.description}</p>
                    </div>
                        <div class="card-actions justify-start flex flex-wrap p-2">
                            {#each post.tags as tag}
                                <div class="badge-primary badge mr-2 first-letter:uppercase">{tag}</div>
                            {/each}
                        </div>
                    </div>
                </div>
        </button>
        <!-- {/if} -->
    {/each}
</div>

<DarkPaginationNav
totalItems={data.posts.length}
pageSize={pageSize}
currentPage={currentPage}
limit={1}
showStepOptions={true}
on:setPage={(e) => currentPage = e.detail.page}
/>