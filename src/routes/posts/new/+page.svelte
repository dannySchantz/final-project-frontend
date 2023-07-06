<script>
    import {getTokenFromLocalStorage, isLoggedIn} from "../../../utils/auth.js"
    import {goto} from "$app/navigation"
    import { onMount } from "svelte";
    import CountryDropdownForForms from "../../../components/CountryDropdownForForms.svelte";

    let formErrors = {};

    onMount(() => {
        checkAuthAndRedirect();
    })

    function checkAuthAndRedirect(){
        isLoggedIn.subscribe(loggedIn =>{
            if(!loggedIn) {
                goto("/");
            }
        })
    }

    function afterUpload(){
        goto("/")
    }

    async function uploadData(evt){

        const [file] = await(evt.target['file'].files[0]);
        const accessToken = getTokenFromLocalStorage
        
        const infoData = {
            file: file,
            description: evt.target['description'].value,
            title: evt.target['title'].value,
            directions: evt.target['directions'].value,
            coordinates: evt.target['coordinates'].value,
            country: evt.target['country'].value,
            tags: evt.target['tags'].value
        }

        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/posts',{
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${accessToken}`
            },
            body:JSON.stringify(infoData)
        })
        
        if (resp.status == 200){
            afterUpload();
        } else {
            const res = await resp.json();
            formErrors = res.data;
        }
    }
</script>


<h1 class="flex items-center justify-center text-4xl mt-5 font-bold" style="font-family:monospace">Upload</h1>
<div class="flex items-center justify-center w-full mt-5">
    <form on:submit|preventDefault={uploadData}>
    <div class="form-control w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center h-64 border-2 border-accent border-dashed rounded-lg cursor-pointer hover:bg-slate-200" style="width:800px; height:346px">
            <svg class="border-stone-950 w-8 h-8 mb-4 text-black dark:text-gray-400" aria-hidden="true" xmlns="hhtp://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" sstoke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
            <input id="dropzone-file" name="file" type="file" class="hidden" />
        </label>

        <label class="label" for="title">
            <span class="label-text mt-2">Title</span>
        </label>
        <input type="text" name="title" placeholder="Title" class="input w-full border-accent placeholder-zinc-500" required />

        <label class="label" for="description">
            <span class="label-text mt-2">Description</span>
        </label>
        <input type="text" name="description" placeholder="Description of this place. Anything that can make this place unique" class="input max-w-full h28 border-accent placeholder-zinc-500" required />

        <label class="label" for="directions">
            <span class="label-text mt-2">Directions</span>
        </label>
        <input type="text" name="directions" placeholder="Direcetions to the location" class="input max-w-full border-accent placeholder-zinc-500" required />

        <label class="label" for="coordinates">
            <span class="label-text mt-2">Coordinates</span>
        </label>
        <input type="text" name="directions" placeholder="Coordinates for the location" class="input max-w-full border-accent placeholder-zinc-500" required />

        <div class="flex justify-between">
            <div>
                <label class="label" for="Countries">
                    <span class="label-text mt-2">Countries</span>
                </label>
                <CountryDropdownForForms />
            </div>
            <div>
                <label class="label" for="Tags">
                    <span class="label-text mt-2" style="width:240px">Tags</span>
                </label>
                <select class="select select-accent w-full">
                    <option disabled selected>Select Tag</option>
                    <option>Hiking</option>
                    <option>Climbing</option>
                    <option>Running</option>
                    <option>Views</option>
                  </select>
            </div>
        </div>
        <button class="btn btn=accent hover:btn-secondary mt-3">Post</button>
    </div>
</form>
</div>

   
