<script>
    import { loggedIn, logOut } from '../utils/auth.js'
    import { goto } from '$app/navigation'    
    import CountryDropdown  from './CountryDropdown.svelte'
    export let currentTheme;
    
    function toggleTheme() {
        currentTheme = currentTheme === "autumn" ? "dracula" : "autumn";
        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem('theme', currentTheme)
        currentTheme = localStorage.getItem('theme');
    }

    function updateTheme() {
        currentTheme = localStorage.getItem('theme');
        if (currentTheme === "autumn") {
            document.documentElement.setAttribute("data-theme", currentTheme);
        } else {
            document.documentElement.setAttribute("data-theme", "dracula");
        }
    }
    function goToUserPostPage() {
        let userId = localStorage.getItem('userId')
        let parsedId = JSON.parse(userId)["userId"]
        console.log(parsedId)
        goto(`/posts/userPost/${parsedId}`)
    }
    function goToSignInPage() {
        goto('/signin')
    }

    function goToSignUpPage(){
        goto('/users/new')
    }

    function goToHomePage(){
        goto('/')
    }
    function goToUploadPage(){
        goto('/posts/new')
    }

    updateTheme();
</script>
<div class="navbar flex justify-between bg-base-100 backdrop-blur z-10 bg-opacity-60 sm:text-lg">
    <button on:click={goToHomePage} class="btn btn-ghost sm:text-2xl md:text-2xl navbar-start w-fit gap-0">
        <span class="lowercase first-letter:uppercase">Discover</span>
        <span class="lowercase first-letter:uppercase">Fy</span>
    </button>
      
    <div class="navbar-end gap-1">
        <button on:click={toggleTheme}>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="btn btn-ghost btn-circle relative swap swap-rotate mr-1">
                <!-- this hidden checkbox controls the state -->
                {#if currentTheme == "dracula"}
                <!-- sun icon -->
                <svg class=" fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                {:else}
                <!-- moon icon -->
                <svg class=" fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                {/if}
            </label>
        </button>
        {#if !$loggedIn} 
        <div class="">
            <button on:click={goToSignInPage} class="btn btn-ghost">Sign In</button>
            <button on:click={goToSignUpPage} class="btn btn-accent">Sign up</button>
        </div>
        {:else}
            <button class="btn btn-ghost" on:click={goToUserPostPage}>Your Posts</button>
            <button class="btn btn-ghost" on:click={goToUploadPage}>Upload</button>
            <button on:click={logOut} class="btn btn-accent">Sign Out</button>
        {/if}
    </div>
  </div>
