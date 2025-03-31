<script lang="ts">
	let { data } = $props();
</script>

<div class="post">
	<div class="post-heading">
		<span class="date">📆 {data.meta.date}</span>
		<h1 class="title">{data.meta.title}</h1>
		<p class="description">{data.meta.description}</p>

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
				border-bottom: 1px solid var(--stone-3);
				padding-bottom: 1rem;
				margin-bottom: 2rem;
		}

		.date{
				color: var(--stone-8);
		}

		.title{
				color: var(--blue-10);
				font-size: var(--font-size-fluid-3);
				line-height: 0;
		}

		.description{
				font-size: var(--font-size-fluid-1);
		}

    .tags {
        list-style: none;
        padding: 0;
        display: flex;
        gap: var(--size-2);
        margin-bottom: var(--size-2);
        li {
            color: var(--stone-7);
            background: var(--stone-1);
            padding: 0 var(--size-1);
            border-radius: var(--size-1);
        }
    }

		.post-content :global {

				h1, h2, h3{
						color: var(--blue-10);
				}

        h1 {
            font-size: var(--font-size-fluid-3);
        }
        h2 {
            font-size: var(--font-size-fluid-2);
        }

        h3 {
            font-size: var(--font-size-fluid-1);
        }

        pre {
						background: var(--gray-0);
            box-shadow: var(--inner-shadow-0);
						padding: var(--size-3);
						margin: var(--size-3) 0;
						overflow-x: auto;
				}

				blockquote {
						background: var(--violet-0);
						box-shadow: var(--inner-shadow-0);
						padding: var(--size-1) var(--size-3);
						margin: var(--size-4) 0;
				}


        table {
            border-collapse: collapse;
						box-shadow: var(--inner-shadow-0);

            thead {
                background-color: var(--blue-0);
                text-align: left;
            }

            th,
            td {
                padding: var(--size-2);
            }

            tbody tr:nth-child(even) {
                background-color: var(--stone-1);
            }
        }

				img{
						max-width: 100%;
				}
		}

</style>