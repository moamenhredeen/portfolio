<script lang="ts">

	interface Project{
		name: string;
		description: string;
		href: string;
		image: string;
	}

	import ecommerceImage from './img/undraw_add_to_cart_re_wrdo.svg'

	const projects: Project[] = [
		{
			name: 'Karam',
			description: 'Ecommerce Platform for the next century',
			href: '#',
			image: ecommerceImage
		},
		{
			name: 'Task Manager',
			description: "Task manager for power user",
			href: '#',
			image: 'https://plus.unsplash.com/premium_photo-1673697239984-b089baf7b6e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww&w=1000&q=80'
		}
	];
</script>

<section class="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
	{#each projects as project}
		<div class="hover:cursor-pointer border-2 border-gray-400 flex flex-col">
			<img src={project.image} alt="project preview" />
			<div class="p-4 flex-1 flex flex-col">
				<h3 class="text-2xl">{project.name}</h3>
				{#if project.description.length > 32}
					<p>{project.description.substring(0, 32)} ...</p>
				{:else }
					<p>{project.description}</p>
				{/if}
				<div class="flex-1 flex justify-end items-end">
					<a class="underline p-2"
					   href="/projects">more info</a>
				</div>
			</div>
		</div>
	{/each}
</section>
