<script lang="ts">
	let { data } = $props();
</script>

<div class="post">
	<span class="text-zinc-500">📆 {data.meta.date}</span>
	<h1 class="text-7xl text-sky-900 font-bold pb-4">{data.meta.title}</h1>
	<p>{data.meta.description}</p>

	<ul class="flex gap-3 py-2">
		{#each data.meta.tags as tag (tag)}
			<li class="bg-sky-50 rounded p-1 text-sky-900">#{tag}</li>
		{/each}
	</ul>

	<hr class="text-zinc-300 mt-4 mb-8">

	<div class="post-content">
		{@render data.content()}
	</div>
</div>


<style lang="postcss">
		@reference "tailwindcss";
		.post {@apply max-w-4xl text-zinc-700;}
		.post-content :global {
				h1 { @apply text-4xl font-bold text-sky-900 pt-12 pb-4; }
        h2 { @apply text-3xl font-bold text-sky-900 pt-8 pb-2; }
        h3 { @apply text-2xl font-bold text-sky-900 pt-4 pb-1; }
        h4,h5,h6 { @apply font-bold text-sky-900; }
        pre {@apply bg-zinc-50 p-4 my-2 border-2 border-zinc-200;}
				blockquote {@apply bg-sky-50 p-4 border-l-4 border-sky-200 my-4;}
		}
</style>