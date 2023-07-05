<script>
    export let data;
    console.log(data)
    // let slug = pa
    function checkForTags(tagsArray, currentTag) {
        for (let i = 0; i < tagsArray.length; i++) {
            if (tagsArray[i] === currentTag) {
                return true
            }
            
        }
        return false
    }
</script>

<div class="w-2/3 align-middle ml-[16.3333333%]">
    <div class="text-center font-extrabold text-3xl mt-5">Malaysia</div>
    <!-- <div class="text-center font-extrabold text-3xl mt-5">{slug}</div> -->
    <div class="text-center mt-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere, quasi atque nulla vel quisquam quibusdam voluptatibus voluptate labore nesciunt adipisci soluta maxime temporibus corporis dicta, nihil et voluptatem eius.</div>
</div>
<!-- {#each data.posts.tags as tags, index} -->
<!-- <div class="font-extrabold ml-20 mt-10 text-2xl">{tags[index]}</div> -->
<div class="carousel w-full h-full carousel-center p-4 space-x-4 rounded-box">
    {#each data.posts as post}
        <!-- {#if checkForTags(post.tags, data.posts.tags[0])} -->
        <div class="carousel-item relative w-[30%]">
            <div class=" gap-10 mx-auto pt-10 pb-10 self-start">
                <div class="card w-fit bg-base-100 shadow-black shadow-2xl">
                    <!-- <figure><img src={post.file} alt="hi"/></figure> -->
                    <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">{post.title}</h2>
                        <p>{post.description}</p>
                        <div class="card-actions justify-end"></div>
                        {#each post.tags as tag}
                            <div class="badge-primary badge">{tag}</div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <!-- {/if} -->
    {/each}
</div>
<!-- {/each} -->