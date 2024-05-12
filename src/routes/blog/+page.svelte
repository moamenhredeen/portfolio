<script lang="ts">
    import inbox from '$lib/images/empty-inbox.svg'
    import book from '$lib/images/book.svg'

    export let data
    let searchKeyword = ''

    function doSomething() {
        console.log("hell world");
    }
</script>

<div class="sticky pb-12">
    <input class="bg-transparent w-full border-gray-400 border-2 outline-none p-4 text-lg"
           type="text"
           bind:value={searchKeyword}
           placeholder="search article ...">
</div>

<ul class="flex flex-col gap-12">
    {#each data.posts
        .filter(e => e.title.toLowerCase().includes(searchKeyword.toLowerCase()))
        .toSorted((a, b) => a.date > b.date ? -1 : 1) as post}
        <li class="flex items-start gap-4">
            <img class="w-16" src={book} alt="book icon">
            <div class="flex flex-col gap-1">
                <p class="text-gray-600">{post.date}</p>
                <h3 class="text-2xl md:text-3xl hover:underline">
                    <a href="/blog/{post.slug}">{post.title}</a>
                </h3>
                <p class="text-gray-600">{post.description}</p>
                <div class="flex gap-2">
                    {#if post.status === 'draft'}
                        <span class="text-red-800 font-bold">{post.status.toUpperCase()}</span>
                    {:else if post.status === 'in progress'}
                        <span class="text-blue-700 font-bold">{post.status.toUpperCase()}</span>
                    {/if}
                </div>
                <div class="flex items-center gap-2 py-1">
                    {#each post.categories as category}
                        <span class="bg-amber-200 rounded-xl px-2 text-gray-800">#{category}</span>
                    {/each}
                </div>
            </div>
        </li>
    {:else}
        <img src={inbox}
             class="m-auto my-12 w-32"
             alt="empty">
    {/each}
</ul>
