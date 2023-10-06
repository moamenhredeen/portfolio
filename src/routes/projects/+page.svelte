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
			name: 'task manager',
			description: "a",
			href: '#',
			image: 'https://plus.unsplash.com/premium_photo-1673697239984-b089baf7b6e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww&w=1000&q=80'
		}
	];
</script>

<section class="p-12 flex gap-12">
	{#each projects as project}
		<div class="border-2 border-gray-400 p-1 w-80 h-80 hover:cursor-navigate" style="cursor: url('/images/navigation.svg'), pointer">
			<img src={project.image} alt="project preview" />
			<div class="p-2">
				<h3 class="text-2xl">{project.name}</h3>
				<p>{project.description.substring(0, 32)} {project.description.length > 32 && '...'}</p>
				<a href="/projects" class="block underline text-right">more info</a>
			</div>
		</div>
	{/each}
</section>
