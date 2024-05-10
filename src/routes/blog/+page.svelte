<script lang="ts">
    export let data
    let searchKeyword = ''
</script>

<div class="sticky pb-12">
    <input class="bg-transparent w-full border-gray-400 border-2 outline-none p-4 text-lg"
           type="text"
           bind:value={searchKeyword}
           placeholder="search article ...">
</div>

<ul class="flex flex-wrap gap-12">
    {#each data.posts as post}
        {#if post.title.toLowerCase().includes(searchKeyword.toLowerCase())}
            <li>
                <h3 class="text-2xl hover:underline">
                    <a href="/blog/{post.slug}">{post.title}</a>
                </h3>
                <p>{post.date}</p>
                <p>{post.description}</p>
                <div class="flex gap-2 py-1">
                    {#each post.categories as category}
                        <span class="bg-amber-200 rounded-xl px-2">#{category}</span>
                    {/each}
                </div>
            </li>
        {/if}
    {/each}
</ul>
