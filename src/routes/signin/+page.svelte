<script>
    import { goto} from '$app/navigation'
    import { logInUser, loggedIn } from '../../utils/auth';
    import { onMount } from 'svelte'
    let isLoading = false;
    let showAlert = false;
    let formErrors = {}
    
    function checkLoggedIn() {
      if ($loggedIn) {
        goto('/');
        alert('You are already logged-in, no need to sign-in :p')
      }
    }
    onMount(checkLoggedIn)

    async function _logInUser(evt) {
        evt.preventDefault();

        const userData = {
        email: evt.target['email'].value,
        password: evt.target['password'].value,
        };

        isLoading = true;

        const res = await logInUser(userData.email, userData.password);

        isLoading = false;

        if (res.success) {
            loggedIn.set(true)
            goto('/');
        } else {
            showAlert = true;
        }
    }
</script>
{#if showAlert}
  <div class="alert alert-info flex justify-start" role="alert">
    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <span class="sr-only">Info</span>
  <div>
    <span class="font-medium">Wrong username or password. Please try again.</span>
  </div>
</div>
{/if}
<h1 class="text-center text-xl mt-20">Please Sign In</h1>
<div class="text-center">
<a class="link-hover italic text-xs" href="/users/new">Don't have an account? Please click here to sign up instead.</a>
</div>
<div class="flex justify-center items-center">
<form on:submit={_logInUser} class="w-full m-12">
  <div class="form-control w-full">
    <label class="label" for="username">
      <span class="label-text ">Email</span>
    </label>
    <input type="text" name="email" placeholder="a@a.com" class="input input-bordered w-full" />
    {#if formErrors.email}
      <p class="text-red-500">{formErrors.email}</p>
    {/if}
  </div>
  
  <div class="form-control w-full">
    <label class="label" for="password">
      <span class="label-text ">Password</span>
    </label>
    <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
    {#if formErrors.password}
      <p class="text-red-500">{formErrors.password}</p>
    {/if}
  </div>
  
    <div class="form-control w-full mt-4">
    {#if isLoading}
    <div class ="flex justify-center shadow-l">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
    {/if}
    <button class="btn btn-md" disabled={isLoading}>Sign In</button>
    </div>
</form>
</div>