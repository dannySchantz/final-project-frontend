<script>
    export let data;
</script>


<div>
    <img src={data.post.file} alt="" class="flex mx-auto w-11/12 h-[60vh] object-cover rounded-lg border-accent border-4" />
    <div class="flex mx-auto w-11/12 text-center">
        <div class="p-4 border-4 border-accent rounded-lg">
            <h1 class="font-extrabold text-3xl first-letter:uppercase">{data.post.title}</h1>
            <h1 class="font-extrabold text-2xl">{data.post.country}</h1>
            <h1 class="font-extrabold text-xl text-justify first-letter:uppercase" style="font-family:Arial, Helvetica, sans-serif">{data.post.description}</h1>
            <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 w-full">
                <div class="mt-5 flex flex-col items-center">
                  <div class="font-extrabold text-xl">Directions</div>
                  <div class="first-letter:uppercase">{data.post.directions}</div>
                </div>
                <div class="mt-5 flex flex-col items-center">
                  <div class="font-extrabold text-xl">Coordinates</div>
                  {data.post.coordinates}
                </div>
                <div class="mt-5 flex flex-col items-center">
                  <div class="font-extrabold text-xl">Experiences</div>
                  {#each data.post.tags as tag}
                  <div class="first-letter:uppercase">{tag}</div>
                  {/each}
                </div>
              </div>
            </div>
        </div>
    </div>
  