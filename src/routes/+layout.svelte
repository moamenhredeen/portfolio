<script lang="ts">
	import type { LayoutProps } from './$types';
	import '../app.css';

	import { fly } from 'svelte/transition';
	import { page } from '$app/state';

	let { children }: LayoutProps = $props();
</script>

<ul>
	<li><a href="/about" class:active={page.url.pathname === '/about/'}>ABOUT</a></li>
	<li><a href="/resume" class:active={page.url.pathname === '/resume/'}>RESUME</a></li>
	<li><a href="/blog" class:active={page.url.pathname.startsWith('/blog/')}>BLOG</a></li>
	<li><a href="/" class:active={page.url.pathname === '/'}>HOME</a></li>
</ul>

{#key page.url.pathname}
	<main in:fly={{ y: 200, duration: 500 }}>
		{@render children()}
	</main>
{/key}

<style>
	ul {
		position: fixed;
		left: 0;
		top: 0;
		list-style: none;
		padding: 0;
		display: flex;
		gap: 4rem;
		transform: rotate(-90deg) translate(-100%, -200%);

		a {
			display: block;
			font-size: 1.2rem;
			text-decoration: none;
			color: inherit;
			transition: 0.3s;
		}

		a.active {
			transform: scale(1.5);
		}
	}

	main {
		max-width: 800px;
	}
</style>
