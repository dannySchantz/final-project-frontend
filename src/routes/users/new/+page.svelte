<script>
    import  { PUBLIC_BACKEND_BASE_URL }  from '$env/static/public';
    import { goto } from '$app/navigation';
    import { logInUser, loggedIn } from './../../../utils/auth.js';
    import { writable } from 'svelte/store';

    let formErrors = {};
    let isLoading = false;
    let showAlert = writable(false);

    // onMount(setShowAlertFalse )
    checkLoggedIn()

    function checkLoggedIn() {
        if ($loggedIn && !$showAlert) {
        goto('/');
        alert('You are already logged-in, no need to signup :p')
    }
}

    function goToHomePage() {
        goto('/')
    }

    async function createUser(evt) {
      evt.preventDefault()
      isLoading = true
      if (evt.target['password'].value != evt.target['password-confirmation'].value) {
        formErrors['password'] = { message: 'Password confirmation does not match' };
        return;
      }
      
      const userData = {
        name: evt.target['name'].value,
        email: evt.target['email'].value,
        password: evt.target['password'].value,
        // passwordConfirm: evt.target['password-confirmation'].value
      };
      
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (resp.status == 200) {
        const res = await logInUser(userData.email, userData.password);
        if (res.success) {
          isLoading = false
          loggedIn.set(true)
          showAlert.set(true)
        //   postSignUp();
        } else {
          isLoading = false
          throw 'Sign up succeeded but authentication failed';
        }
      } else {
        isLoading = false
        const res = await resp.json();
        formErrors = res.data;
      }
    }
    </script>
  <!-- {#if } -->
  <!-- <div class="alert alert-info shadow-l flex justify-start">
      <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>    </svg>
    <p class="justify-left">Please sign up first.</p>
  </div> -->
    <!-- {/if} -->
{#if $showAlert}
<div class="justify-center grid grid-cols-1 grid-rows-2">
  <div class="alert alert-success mx-4 max-h-20 rounded-xl mt-4 w-auto row-span-1 flex flex-col items-center">
    <span><strong>Thank you for signing up!</strong></span>
    <span class="font-extralight ">Please check your email for confirmation.</span>
  </div>

<button  on:click={goToHomePage} class="btn w-1/3 flex justify-self-center h-20 mx-4 rounded-xl mt-[10%] row-span-1">Click here to return to home</button>
</div>
{:else}
    <h1 class="text-center text-xl mt-20 ">Please create your account.</h1>
    <div class="text-center">
      <a class="link-hover italic text-xs" href="/auth">Already have an account? Click here to login instead.</a>
    </div>
    <div class="flex justify-center items-center">
      <form on:submit={createUser} class="w-full m-12">
        <div class="form-control w-full">
          <label class="label" for="name">
            <span class="label-text ">Name</span>
          </label>
          <input type="text" name="name" placeholder="johndoe" class="input input-bordered w-full" />
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
          {#if 'email' in formErrors}
          <label class="label" for="email">
            <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
          {#if 'password' in formErrors}
          <label class="label" for="password">
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="password">
            <span class="label-text">Confirm Password</span>
          </label>
          <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
          {#if 'password' in formErrors}
          <label class="label" for="password">
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
          </label>
          {/if}
        </div>
        
        {#if isLoading}
            <div class ="flex justify-center shadow-l">
              <span class="loading loading-infinity loading-lg"></span>
            </div>
        {/if}
        <button class="btn btn-md w-full mt-4 rounded-xl" disabled={isLoading}>Create An Account</button>
    </form>
    </div>
{/if}
    