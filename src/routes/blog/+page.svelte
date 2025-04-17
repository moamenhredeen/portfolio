<script lang="ts">
	let { data } = $props();
</script>

<ul class="post-list">
	{#each data.posts as item, index (item.slug)}
		<li class="post">
			<span class="date">📆 {item.date}</span>
			<h1 class="title">{item.title}</h1>
			<p class="description">{item.description}</p>
			<ul class="tags">
				{#each item.tags as tag (tag)}
					<li class="tag">#{tag}</li>
				{/each}
			</ul>
			<a class="read-link" href={item.slug}>Read article ❯</a>
		</li>
		{#if index < data.posts.length - 1}
			<div class="sep"></div>
		{/if}
	{/each}
</ul>

<style>
	.post-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-3);
	}

	.date {
		color: var(--stone-8);
	}

	.title {
		padding: 0;
		margin: 0;
		color: var(--blue-10);
		font-size: var(--font-size-fluid-3);
		line-height: var(--font-lineheight-0);
	}

	.description {
		font-size: var(--font-size-fluid-1);
	}

	.tags {
		list-style: none;
		padding: 0;
		display: flex;
		gap: var(--size-2);
		margin-bottom: var(--size-2);
		.tag {
			color: var(--stone-7);
			background: var(--stone-1);
			padding: 0 var(--size-1);
			border-radius: var(--size-1);
		}
	}

	.read-link {
		text-decoration: none;
		color: var(--blue-10);
		font-weight: var(--font-weight-4);
		font-style: italic;
		&:hover {
			text-decoration: underline;
		}
	}

	.sep {
		height: 1px;
		background: var(--stone-2);
	}
</style>
