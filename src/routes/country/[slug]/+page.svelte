<script>
    import { goto } from '$app/navigation';
    import { goToPostPage } from '../../../utils/auth.js';
    export let data;
    // console.log(data)
    // let slug = pa
    // function checkForTags(tagsArray, currentTag) {
    //     for (let i = 0; i < tagsArray.length; i++) {
    //         if (tagsArray[i] === currentTag) {
    //             return true
    //         }
            
    //     }
    //     return false
    // }

    
</script>

<div class="w-2/3 align-middle ml-[16.3333333%]">
    <div class="text-center font-extrabold text-3xl mt-5 first-letter:uppercase">{data.reformattedCountryName}</div>
    <div class="text-center mt-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere, quasi atque nulla vel quisquam quibusdam voluptatibus voluptate labore nesciunt adipisci soluta maxime temporibus corporis dicta, nihil et voluptatem eius.</div>
  </div>
  <div class="carousel w-full h-full carousel-center p-4 space-x-4 rounded-box">
    {#each data.posts as post}
      <!-- {#if checkForTags(post.tags, data.posts.tags[0])} -->
      <div class="card hover:transition delay-150 hover:-translate-y-10 shadow-xl shadow-black hover:shadow-black flex flex-col justify-between" style="width: 550px">
        <figure style="height: 280px;" class="relative">
          <img src={post.file} alt="" />
        </figure>
        <div class="overflow-hidden card-body flex-grow rounded-b-2xl">
          <h2 class="card-title text-2xl font-bold mb-2">{post.title}</h2>
          <p class="mb-4 overflow-hidden text-lena-uniform text-justify w-auto h-24">{post.description}</p>
          <div class="card-actions items-end justify-end">
                {#each post.tags as tag}
                <div class="badge-primary badge mr-2">{tag}</div>
                {/each}
              </div>
            </div>
          </div>
    
      <!-- {/if} -->
    {/each}
  </div>


