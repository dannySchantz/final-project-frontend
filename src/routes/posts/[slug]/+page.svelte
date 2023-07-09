<script>
    export let data;
    console.log(data)
</script>


<div class="flex flex-col items-center w-screen h-[60vh]">
    <img src="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/reasons-to-visit-new-caledonia/_jcr_content/parsysTop/hero.img.full.medium.jpg/1559623611557.jpg" alt="" class="w-screen h-[60vh] absolute z-[-1]" />
    <!-- <img src={data.post.file} alt="" class="w-screen absolute h-[60vh] z-[-1]" /> -->
    <div class="flex flex-col items-center mt-[21vh] first-letter:uppercase gap-10">
        <h1 class="font-extrabold text-3xl first-letter:uppercase">{data.post.title}</h1>
        <h1 class="font-extrabold text-2xl">{data.post.country}</h1>
        <h1 class="font-extrabold text-xl first-letter:uppercase">{data.post.description}</h1>
    </div>
</div>
<div class="grid lg:grid-cols-3 grid-cols-1 w-full">
<div class=" mt-5 flex flex-col items-center">
    <div class="font-extrabold text-xl">Directions</div>
    <div class="first-letter:uppercase">{data.post.directions}</div>
</div>
<div class=" mt-5 flex flex-col items-center">
    <div class="font-extrabold text-xl">Coordinates</div>
        {data.post.coordinates}
</div>
<div class=" mt-5 flex flex-col items-center">
    <div class="font-extrabold text-xl ">Experiences</div>
    <div class="first-letter:uppercase">{data.post.tags[0]}, {data.post.tags[1]}</div>
</div>
</div>
