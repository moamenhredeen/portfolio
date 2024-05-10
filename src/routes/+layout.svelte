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

<div class="bg-amber-50 min-h-screen flex justify-center">

    <main class="w-3/4 lg:w-2/3 xl:w-1/2 mb-24 pt-12">
        <slot/>
    </main>

    <nav class="fixed bottom-0 left-0 right-0 flex justify-center p-5">
        <ul class="flex shadow-xl bg-amber-50 border-gray-400 border-2">
            {#each links as link}
                <li>
                    <a class="hover:bg-lime-100 p-2 px-12 flex flex-col items-center"
                       class:bg-lime-300={link.href + "/" === $page.url.pathname}
                       class:border-transparent={link.href !== $page.url.pathname}
                       href="{link.href}">
                        <img src="{link.icon}"
                             class="inline w-8 h-8"
                             alt="page icon">
                        {link.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</div>
