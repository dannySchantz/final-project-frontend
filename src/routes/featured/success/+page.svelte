<script>
    import { goto } from '$app/navigation'  
    // export let data;
    function goToHomePage() {
        goto('/')
    }
</script>
<div class="flex justify-center">Please try again, something went wrong when posting. </div>
<div class="flex justify-center">
    If you have any questions, please email
</div>
<div class="flex justify-center" href="mailto:orders@example.com">orders@example.com</div>.
<div class="flex justify-center">
    <button class="btn" on:click={goToHomePage}>Homepage</button>
</div>
