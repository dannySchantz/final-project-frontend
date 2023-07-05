<script>
    export let data;
</script>
<!-- <div class="w-screen grid grid-cols-6 mt-10"> -->

<div class="w-2/3 align-middle ml-[16.3333333%]">
    <div class="text-center font-extrabold text-3xl mt-5">Malaysia</div>
    <!-- <h1>{data.posts.country}</h1> -->
    <div class="text-center mt-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae facere, quasi atque nulla vel quisquam quibusdam voluptatibus voluptate labore nesciunt adipisci soluta maxime temporibus corporis dicta, nihil et voluptatem eius.</div>
</div>
{#each data.posts as post}
<div class="font-extrabold ml-20 mt-10 text-2xl">{data.post.title}</div>
    <div class="carousel w-full h-full carousel-center p-4 space-x-4 rounded-box">
        <!-- Slide 1 -->
        <div class="carousel-item relative w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mx-auto pt-10 pb-10" style="width: 1200px;">
            <!-- Card 1 -->
            <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
              <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
              <div class="card-body">
                <h2 class="card-title">Island!</h2>
                <p>Where is your next destination?</p>
                <div class="card-actions justify-end">
                </div>
              </div>
            </div>
        </div>
    </div>
</div>
{/each}
            <!-- Card 2
            <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
              <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
              <div class="card-body">
                <h2 class="card-title">Island!</h2>
                <p>Where is your next destination?</p>
                <div class="card-actions justify-end">
                </div>
              </div>
            </div>
             Card 3 -->
            <!-- <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
              <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
              <div class="card-body">
                <h2 class="card-title">Island!</h2>
                <p>Where is your next destination?</p>
                <div class="card-actions justify-end">
                </div>
              </div>
            </div>
          </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" class="btn btn-circle">❮</a> 
            <a href="#slide2" class="btn btn-circle">❯</a>
          </div>
        </div> -->
        
        <!-- Slide 2 -->
        <!-- <div id="slide2" class="carousel-item relative w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mx-auto pt-10 pb-10" style="width: 1200px;">
                Card 1 (Duplicate) -->
            <!-- <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
              <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
              <div class="card-body">
                <h2 class="card-title">Island!</h2>
                <p>Where is your next destination?</p>
                <div class="card-actions justify-end">
                </div>
              </div>
            </div> -->
            <!-- Card 2 (Duplicate) -->
            <!-- <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
              <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
              <div class="card-body">
                <h2 class="card-title">Island!</h2>
                <p>Where is your next destination?</p>
                <div class="card-actions justify-end">
                </div>
              </div>
            </div> -->
            <!-- Card 3 (Duplicate) -->
            <!-- <div class="card w-96 bg-base-100 shadow-black shadow-2xl"> -->
              <!-- <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
              <div class="card-body">
                <h2 class="card-title">Island!</h2>
                <p>Where is your next destination?</p>
                <div class="card-actions justify-end">
                </div>
              </div>
            </div>
          </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" class="btn btn-circle">❮</a> 
            <a href="#slide3" class="btn btn-circle">❯</a>
          </div>
        </div> -->
        
        <!-- Add more slides if needed -->
    
