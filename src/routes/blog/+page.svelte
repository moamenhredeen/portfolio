<script lang="ts">
	let { data } = $props();
</script>

<ul class="max-w-4xl">
{#each data.posts as item (item.slug)}
	<li class="p-8">
		<span class="text-zinc-500">📆 {item.date}</span>
		<h1 class="text-4xl py-2 text-sky-900 font-bold">{item.title}</h1>
		<p class="text-zinc-600 text-xl">{item.description}</p>
		<ul class="flex gap-3 py-2">
			{#each item.tags as tag (tag)}
				<li class="bg-sky-50 rounded p-1 text-sky-900">#{tag}</li>
			{/each}
		</ul>
		<a href="{item.slug}" class="text-sky-900">Read article  ❯</a>
	</li>
{/each}
</ul>
