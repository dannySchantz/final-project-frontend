<script>
    import {PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { getTokenFromLocalStorage, loggedIn} from "../../../utils/auth.js"
    import { goto } from "$app/navigation"
    import Select from 'svelte-select';
    import { tags, countries } from "../../svelte-select-items.js";
    import { generateFileWithUniqueName, uploadMedia } from '../../../utils/s3-uploader.js'

    let formErrors = {};
    let imageUrl = '';
    let fileNamed = '';
    let isLoading = false;
    let infoData = {};
    const accessToken = getTokenFromLocalStorage()

    checkLoggedIn()

    function checkLoggedIn() {
        if (!$loggedIn) {
            goto('/');
            alert('login first!')
        }
    }

    function afterUpload(){
        goto("/")
    }

    async function uploadData(infoData){
        isLoading = true
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/posts',{
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${accessToken}`
            },
            body: JSON.stringify(infoData)
        })
        
        if (resp.status == 200){
            isLoading = false
            afterUpload();
        } else {
            const res = await resp.json();
            formErrors = res.data;
        }
    }

    async function openStripeCheckout(event) {
        isLoading = true
        let checkBoxTrueFalse = event.target['featured-checkbox'].checked;

        const renamedFile = generateFileWithUniqueName(fileNamed)
    
        const [fileName, fileUrl] = await uploadMedia(renamedFile)


        const countryValue = event.target['country'].value;
        const experienceValue = event.target['experiences'].value;
        let countryParsedValue = ''
        let experienceParsedValue = []
        let finalExperienceValue = []
        if (countryValue) { 
            countryParsedValue = JSON.parse(countryValue).value
            countryParsedValue = countryParsedValue.charAt(0).toUpperCase() + countryParsedValue.slice(1);
        }
        if (experienceValue) {
            experienceParsedValue = JSON.parse(experienceValue)
            for (let i = 0; i < experienceParsedValue.length; i++) {
                finalExperienceValue.push(experienceParsedValue[i].value)
            }
        }

        infoData = {
            file: fileUrl,
            name: fileName,
            description: event.target['description'].value,
            title: event.target['title'].value,
            directions: event.target['directions'].value,
            coordinates: event.target['coordinates'].value,
            country: countryParsedValue,
            tags: finalExperienceValue,
            featured: false,
        }

        if (checkBoxTrueFalse === false) {
            await uploadData(infoData)
            isLoading = false
            return
        }

        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/create-checkout-session', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoData)
        });
        if (resp.status == 200) {
            await uploadData(infoData)
            const res = await resp.json()
            window.location.replace(res)
        } else {
          alert('Failed to continue to checkout.')
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        imageUrl = URL.createObjectURL(file);
        fileNamed = file
    }
</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>


<h1 class="flex items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400" style="font-family:monospace">Upload</h1>
<div class="flex items-center justify-center w-full mt-5 text-gray-500 dark:text-gray-400">
    <form on:submit|preventDefault={openStripeCheckout}>
    <div class="form-control w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center border-2 border-accent border-dashed rounded-lg cursor-pointer hover:border-4 w-full h-[30vw]">
            {#if !imageUrl}
            <svg class="border-stone-950 w-8 h-8 mb-4  " aria-hidden="true" xmlns="hhtp://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
            <input id="dropzone-file" name="file" type="file" class="hidden" on:change={handleFileChange} multiple={false}/>
            {:else}
            <input id="dropzone-file" name="file" type="file" class="hidden" on:change={handleFileChange} multiple={false}/>
            <img alt="" class="items-center justify-center w-full h-full object-cover rounded-lg cursor-pointer" src={imageUrl} />
            {/if}
        </label>
        <label class="label" for="title">
            <span class=" mt-2">Title</span>
        </label>
        <input type="text" name="title" placeholder="Title" class="hover:border-2 input w-full border-accent " required />

        <label class="label" for="description">
            <span class=" mt-2">Description</span>
        </label>
        <input type="text" name="description" placeholder="Description of this place. Anything that can make this place unique" class="hover:border-2 input max-w-full border-accent " required />

        <label class="label" for="directions">
            <span class="mt-2">Directions</span>
        </label>
        <input type="text" name="directions" placeholder="Directions to the location" class="hover:border-2 input max-w-full border-accent " required />

        <label class="label" for="coordinates">
            <span class="mt-2">Coordinates</span>
        </label>
        <input type="text" name="coordinates" placeholder="Coordinates for the location" class="hover:border-2 input max-w-full border-accent" required />
        <div class="flex justify-start mt-2 w-full">
            <div class="text-base sm:text-2xl w-full">Would you like this post to be featured for $10.00?</div>
            <input type="checkbox" name="featured-checkbox" class="checkbox checkbox-accent ml-2 mt-1" />
        </div>
        <div class="flex justify-between sm:justify-start gap-4">
            <div>
                <label class="label " for="Countries">
                    <span class="mt-2 h-full">Country</span>
                </label>
                <Select required items={countries} searchable={true} placeholder="Countries" name="country" class="select-styles dark:text-gray-400 bg-base-100" />
            </div>
            <div>
                <label class="label" for="Tags">
                    <span class="mt-2 h-full">Tags</span>
                </label>
                <Select multiple closeListOnChange={false} required items={tags} searchable={true} placeholder="Experiences" name="experiences" class="select-styles dark:text-gray-400 select-tags" />
            </div>

        </div>
        {#if isLoading}
          <div class ="flex justify-center shadow-l">
            <span class="loading loading-infinity loading-lg"></span>
          </div>
          {/if}
          <button class="btn hover:btn-accent mt-3" disabled={isLoading}>Post
        </button>
    </div>
</form>
</div>

<style>
    :global(.select-styles) {
        width: 30vw !important;
        /* max-width: 200% !important; */
        --tw-text-opacity: 1 !important;
        color: rgb(107 114 128 / var(--tw-text-opacity)) !important;
        background-color: transparent !important;
        --tw-border-opacity: 1 !important;
        border-color: hsl(var(--a) / var(--tw-border-opacity)) !important;
    }  
    :global(.select-styles:hover) {
        border-width: 2px !important;
    }

    :global(.svelte-select-list) {
        --tw-bg-opacity: 1 !important;
        background-color: hsl(var(--b1) / var(--tw-bg-opacity)) !important;
    }
</style>

   
