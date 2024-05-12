<script lang="ts">
    export let data
</script>

<!-- SEO -->
<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content={data.meta.title}/>
</svelte:head>

<!-- Title -->
<hgroup>
    <h1 class="text-4xl my-2">
        {data.meta.title}
        {#if data.meta.status === 'draft'}
            <span class="text-red-800 font-bold text-xl italic">{data.meta.status.toUpperCase()}</span>
        {:else if data.meta.status === 'in progress'}
            <span class="text-blue-800 font-bold text-xl italic">{data.meta.status.toUpperCase()}</span>
        {/if}
    </h1>
    <p class="text-gray-600">Published at {data.meta.date}</p>
</hgroup>


<!-- Tags -->
<div class="flex gap-2 my-4">
    {#each data.meta.categories as category}
        <span class="bg-amber-200 rounded-xl px-4 italic text-gray-800">&num;{category}</span>
    {/each}
</div>

<hr class="w-1/2 my-6">

<!-- Post -->
<div class="post-content">
    <svelte:component this={data.content}/>
    <!--  TODO:  collect the links and add them at end in a references section  -->
    <!--  TODO:  add table of content component (on the right side maybe) -->
</div>

<style lang="postcss">

    .post-content :global(h1) {
        @apply text-3xl;
        @apply my-4;
    }


    .post-content :global(h2) {
        @apply text-2xl;
        @apply my-4;
    }


    .post-content :global(h3) {
        @apply text-xl;
        @apply my-2;
    }


    .post-content :global(h4) {
        @apply text-lg;
        @apply my-1;
    }


    .post-content :global(pre) {
        @apply my-4 p-4 border border-gray-300;
    }
</style>
