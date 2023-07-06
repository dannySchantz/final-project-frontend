<script>
    // export let data 
    import { goto } from '$app/navigation'    

    function searchTime(evt) {
        evt.preventDefault()
        if (!evt.target['country'].value) {
          goto(`/tags/${evt.target['tags'].value}`)
        } else if (!evt.target['tags'].value) {
          goto(`/country/${evt.target['country'].value}`)
        } else {
        goto(`/country-tag/${evt.target['country'].value}_${evt.target['tags'].value}`)
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
    <div class="absolute top-10 right-10 md:top-1/2 md:right-150 transform -translate-y-1/2 bg-black bg-opacity-70 w-[470px] md:w-[470px] h-[240px] px-6 py-4 flex flex-col items-center justify-center text-white text-lg rounded-lg">
      <!-- Search input and button -->
      <input type="text" name="country"  placeholder="Country" class="w-full mb-2 px-4 py-2 text-lg rounded-lg text-gray-400" />
      <!-- <input type="text" name="searchbox" placeholder="Country" class="w-full mb-2 px-4 py-2 text-lg bg-neutral" /> -->
      <input type="text" name="tags" placeholder="Experience" class="w-full mb-2 px-4 py-2 text-lg rounded-lg text-gray-400" />
      <button class="form-submit search-button btn w-full py-2 px-4 rounded-md cursor-pointer text-lg">Search</button>
    </div>
  </form>
</div>




  <div class="carousel w-full -mb-12">
    <!-- Slide 1 -->
    <div id="slide1" class="carousel-item relative w-full">
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
        <!-- Card 2 -->
        <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
          <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
          <div class="card-body">
            <h2 class="card-title">Island!</h2>
            <p>Where is your next destination?</p>
            <div class="card-actions justify-end">
            </div>
          </div>
        </div>
        <!-- Card 3 -->
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
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide4" class="btn btn-circle">❮</a> 
        <a href="#slide2" class="btn btn-circle">❯</a>
      </div>
    </div>
    
    <!-- Slide 2 -->
    <div id="slide2" class="carousel-item relative w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mx-auto pt-10 pb-10" style="width: 1200px;">
        <!-- Card 1 (Duplicate) -->
        <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
          <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
          <div class="card-body">
            <h2 class="card-title">Island!</h2>
            <p>Where is your next destination?</p>
            <div class="card-actions justify-end">
            </div>
          </div>
        </div>
        <!-- Card 2 (Duplicate) -->
        <div class="card w-96 bg-base-100 shadow-black shadow-2xl">
          <figure><img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" /></figure>
          <div class="card-body">
            <h2 class="card-title">Island!</h2>
            <p>Where is your next destination?</p>
            <div class="card-actions justify-end">
            </div>
          </div>
        </div>
        <!-- Card 3 (Duplicate) -->
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
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide1" class="btn btn-circle">❮</a> 
        <a href="#slide3" class="btn btn-circle">❯</a>
      </div>
    </div>
    
    <!-- Add more slides if needed -->
  </div>
  



  
<style>

</style>


