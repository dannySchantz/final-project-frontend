<script>
    export let data;
</script>

{#each data.posts as post}
<div class="text-xl text-black w-30 h-30">{post.title}</div>

{/each}