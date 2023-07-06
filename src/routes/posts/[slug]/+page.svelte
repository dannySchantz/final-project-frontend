<script>
    export let data;
</script>


<div class="flex justify-center">
    <img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" class="w-screen h-[60vh]" />

    <!-- Text overlay -->
    <div class="text-primary-content absolute justify-center mt-[160px] first-letter:uppercase ">
        <h1 class="font-extrabold text-3xl">{data.post.title}</h1>
        <h1 class="font-extrabold text-2xl flex justify-center">{data.post.description}</h1>
    </div>
</div>