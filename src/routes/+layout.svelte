<script lang="ts">
	import type { LayoutProps } from './$types';
	import '../app.css';

	import {fly} from 'svelte/transition';
	import { page } from '$app/state';

	let { children }: LayoutProps = $props();
</script>

{#key page.url.pathname}
	<main  in:fly={{ x: -200, duration: 500 }} class="p-32 min-h-screen">
		{@render children()}
	</main>
{/key}
