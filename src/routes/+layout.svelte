<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="p-32">
	{@render children()}
</main>
