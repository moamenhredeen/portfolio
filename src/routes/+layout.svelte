<script lang="ts">
    import "../app.css"
    import {page} from "$app/stores";

    import homeIcon from '$lib/images/home.svg'
    import projectsIcon from '$lib/images/idea.svg'
    import blogIcon from '$lib/images/user-interface.svg'
    import aboutIcon from '$lib/images/user.svg'

    const links = [
        {name: "Home", href: "/", icon: homeIcon},
        {name: "Projects", href: "/projects", icon: projectsIcon},
        {name: "Blog", href: "/blog", icon: blogIcon},
       {name: "About", href: "/about", icon: aboutIcon},
    ]

</script>

<div class="relative">
    <nav class="fixed h-screen top-0 left-0 w-80 bg-amber-50 flex flex-col justify-center items-center border-r-2 border-gray-400">
        <ul class="w-full">
            <hr>
            {#each links as link}
                <li>
                    <a class="block px-12 py-12 border-y-2 border-gray-400 hover:cursor-pointer text-2xl h-full hover:bg-lime-100 hover:underline"
                       class:bg-lime-300={$page.url.pathname === link.href}
                       class:border-transparent={$page.url.pathname !== link.href}
                       href="{link.href}">
                        <img src="{link.icon}"
                             class="inline w-12 h-12 mr-4"
                             alt="page icon">
                        {link.name}
                    </a>
                </li>
                <hr>
            {/each}
        </ul>
    </nav>

    <main class="absolute top-0 left-80 right-0 min-h-screen bg-amber-50">
        <slot/>
    </main>
</div>
