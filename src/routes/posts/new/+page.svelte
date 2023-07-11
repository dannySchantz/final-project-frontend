<script>
    import {PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { getTokenFromLocalStorage, loggedIn} from "../../../utils/auth.js"
    import { goto } from "$app/navigation"
    import Select from 'svelte-select';
    import { tags, countries } from "../../svelte-select-items.js";
    import CountryDropdownForForms from "../../../components/CountryDropdownForForms.svelte";
    import { generateFileWithUniqueName, uploadMedia } from '../../../utils/s3-uploader.js'

    let formErrors = {};
    let imageUrl = '';
    let fileNamed = '';
    let isLoading = false;

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

    async function uploadData(event){
        isLoading = true
        let checkBoxTrueFalse = event.target['featured-checkbox'].checked;

        // if (checkBoxTrueFalse === true) {
        //     await openStripeCheckout()
        // }

        const renamedFile = generateFileWithUniqueName(fileNamed)
    
        const [fileName, fileUrl] = await uploadMedia(renamedFile)

        const accessToken = getTokenFromLocalStorage()

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

        const infoData = {
            file: fileUrl,
            name: fileName,
            description: event.target['description'].value,
            title: event.target['title'].value,
            directions: event.target['directions'].value,
            coordinates: event.target['coordinates'].value,
            country: countryParsedValue,
            tags: finalExperienceValue,
            featured: checkBoxTrueFalse,
        }
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

    async function openStripeCheckout() {

        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/create-checkout-session', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        });
        if (resp.status == 200) {
          const res = await resp.json()
          window.open(res)
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


<h1 class="flex items-center justify-center text-4xl mt-5 font-bold text-gray-500 dark:text-gray-400" style="font-family:monospace">Upload</h1>
<div class="flex items-center justify-center w-full mt-5 text-gray-500 dark:text-gray-400">
    <form on:submit|preventDefault={uploadData}>
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
            <div class="text-xl w-full">Would you like this post to be featured for $10.00?</div>
            <input type="checkbox" name="featured-checkbox" class="checkbox checkbox-accent ml-2 mt-1" />
        </div>
        <div class="flex justify-between sm:justify-start gap-4">
            <div>
                <label class="label " for="Countries">
                    <span class="mt-2 w-full">Country</span>
                </label>
                <Select required items={countries} searchable={true} placeholder="Countries" name="country" class="select-styles dark:text-gray-400 custom-dropdown bg-base-100" />
            </div>
            <div>
                <label class="label" for="Tags">
                    <span class="mt-2">Tags</span>
                </label>
                <Select multiple closeListOnChange={false} required items={tags} searchable={true} placeholder="Experiences" name="experiences" class="select-styles dark:text-gray-400 select-tags" />
            </div>

        </div>
        {#if isLoading}
          <div class ="flex justify-center shadow-l">
              <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
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

   
