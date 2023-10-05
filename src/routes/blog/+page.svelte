<script lang="ts">
    export let data
    let searchKeyword = ''

    import searchIcon from '$lib/images/search.svg'
</script>

<div class="sticky top-0 left-0 right-0 bg-amber-50">
    <img src="{searchIcon}"
         class="absolute top-4 left-4 h-12 w-12"
         alt="search icon">
    <input class="bg-transparent w-full border-gray-400 border-b-2 outline-none px-24 py-6 text-2xl"
           type="text"
           bind:value={searchKeyword}
           placeholder="search article ...">
</div>

<ul class="grid grid-cols-3 gap-12 p-12">
    {#each data.articles as article, index}
        {#if article.name.toLowerCase().includes(searchKeyword.toLowerCase())}
            <li>
                <h3 class="text-4xl hover:underline py-4">
                    <a href="{article.url}">{article.name}</a>
                </h3>
                <p>{article.description}</p>
            </li>
        {/if}
    {/each}
</ul>
