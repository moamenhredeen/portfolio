<script lang="ts">
	import type { LayoutProps } from './$types';
	import '../app.css';

	import {fly} from 'svelte/transition';
	import { page } from '$app/state';

	let { children }: LayoutProps = $props();
</script>

{#key page.url.pathname}
	<main  in:fly={{ x: -200, duration: 500 }}>
		{@render children()}
	</main>
{/key}


<style>
	main{
      max-width: 800px;
	}
</style>