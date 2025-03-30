<script lang="ts">
	let { data } = $props();
</script>

<ul>
{#each data.posts as item (item.slug)}
	<li class="post">
		<span class="date">📆 {item.date}</span>
		<h1>{item.title}</h1>
		<p>{item.description}</p>
		<ul class="tags">
			{#each item.tags as tag (tag)}
				<li class="tag">#{tag}</li>
			{/each}
		</ul>
		<a class="read-link" href="{item.slug}">Read article  ❯</a>
	</li>
{/each}
</ul>


<style>
	.post{
			margin-bottom: 4rem;
      font-size: calc(10px + 0.25vw);
	}

	.date{
			color: gray;
	}

	.tags{
			display: flex;
			gap: 1rem;
			border-radius: 1rem;
			margin-top: .5rem;
      margin-bottom : .5rem;

			.tag{
          font-size: calc(9px + 0.33vw);
					background: #f4f4f5;
					padding: .1rem .2rem;
					border-radius: 0.2rem;
			}
	}

	.read-link{
			text-decoration: none;
	}
</style>