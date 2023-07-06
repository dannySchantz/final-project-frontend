<script>
    // export let data 
</script>

<div class="flex justify-center pt-5 w-screen">
    <div style="display: flex; align-items: center; position: relative;">
      <img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" class="relative w-screen h-[60vh]" />
  
      <!-- Text overlay -->
      <div style="position: absolute; top: 100px; left: 150px; color: white; font-size: 24px; background-color: rgba(0, 0, 0, 0.7); padding: 10px; max-width: 470px; max-height: 270px; border-radius: 20px">
        <h1>Your text goes here.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at efficitur purus, eu vestibulum est. Etiam luctus laoreet venenatis. Nullam pharetra scelerisque scelerisque.</p>
      </div>
  
      <!-- Search box with background -->
      <div style="position: absolute; top: 100px; right: 150px; background-color: rgba(0, 0, 0, 0.7); width: 470px; height: 240px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-size: 18px; border-radius: 20px">
        <!-- Search input and button -->
        <input type="text" name="searchbox" placeholder="Country" style="width: 100%; margin-bottom: 10px; padding: 10px; font-size: 16px;" class="bg-neutral">
        <input type="text" name="searchbox" placeholder="Experience" style="width: 100%; margin-bottom: 10px; padding: 10px; font-size: 16px;" class="bg-neutral">
        <button class="search-button" style="width: 100%; padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Search</button>
      </div>
    </div>
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


