<script lang="ts">
	let { data } = $props();
</script>

<div class="post">
	<div class="post-heading">
		<span class="date">📆 {data.meta.date}</span>
		<h1>{data.meta.title}</h1>
		<p>{data.meta.description}</p>

		<ul class="tags">
			{#each data.meta.tags as tag (tag)}
				<li>#{tag}</li>
			{/each}
		</ul>
	</div>

	<div class="post-content">
		{@render data.content()}
	</div>
</div>


<style>

		.post-heading{
				border-bottom: 1px solid var(--bg-medium);
				padding-bottom: 1rem;
				margin-bottom: 2rem;
		}

		.date{
				color: var(--text-light);
		}

		.tags {
				display: flex;
				gap: 1rem;
				li{
						background: var(--bg-light);
						color: var(--text-light);
						padding: .1rem .2rem;
						border-radius: .2rem;
				}
		}

		.post-content :global {

        h1 {
            font-size: 3em;
        }
        h2 {
            font-size: 2em;
        }

        h3 {
            font-size: 1.4em;
        }

        pre {
						background: var(--bg-lighter);
						padding: 1rem;
						margin: 2rem 0;
						border: 2px solid var(--bg-medium);
						overflow-x: auto;
				}

				blockquote {
						background: var(--bg-lighter);
						padding: .1rem 1rem;
						margin: 2rem 0;
						border-left: .3rem solid var(--secondary);
				}

        ul{
            list-style: disc;
						padding-left: 1.6rem;
						line-height: 2rem;
						li{
								font-size: 1.3rem;
						}
        }


        table {
            border-collapse: collapse;
						border: 1px solid var(--bg-medium);

            thead {
                background-color: var(--secondary);
                color: var(--primary);
                text-align: left;
            }

            th,
            td {
                padding: 0.5rem;
            }

            tbody tr:nth-child(even) {
                background-color: var(--bg-light);
            }
        }
		}

</style>