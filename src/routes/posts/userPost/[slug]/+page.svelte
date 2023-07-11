<script>
    export let data;
    import { goToPostPage } from '../../../../utils/auth.js';
    console.log(data)
</script>
<div class="flex justify-center text-3xl font-extrabold">Your Posts!</div>
<div class="grid sm:grid-cols-2 md:grid-cols-3 w-full h-full carousel-center p-4 gap-4 rounded-box">
    {#each data.posts as post}
        <!-- {#if checkForTags(post.tags, data.posts.tags[0])} -->
        <button class=" relative hover:scale-[1.05] transition-transform duration-300" on:click={goToPostPage(post.id)}>
            <div class=" gap-10 mx-auto pt-10 pb-10 self-start">
                <div class="card w-fit bg-base-100 shadow-black shadow-lg max-h-80">
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