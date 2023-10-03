<script>
    export let data
    let searchKeyword = ''
</script>

<div class="sticky top-0 left-0 right-0 bg-amber-50">
    <input class="bg-transparent w-full border-gray-400 border-b-2 outline-none p-6 text-2xl"
           type="text"
           bind:value={searchKeyword}
           placeholder="search article ...">
</div>

<ul class="flex flex-wrap p-8">
    {#each data.articles as article, index}
        {#if article.name.includes(searchKeyword)}
            <li class="border-gray-200 p-8">
                <a href="{article.url}" class="text-4xl hover:underline">
                    {article.name}
                </a>
                <p>{article.description}</p>
            </li>
        {/if}
    {/each}
</ul>
