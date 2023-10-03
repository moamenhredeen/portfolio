<script lang="ts">
    import "../app.css"
    import {page} from "$app/stores";

    const links = [
        {name: "Home", href: "/"},
        {name: "Projects", href: "/projects"},
        {name: "Blog", href: "/blog"},
       {name: "About", href: "/about"},
]
</script>

<div class="relative">
    <nav class="fixed h-screen top-0 left-0 w-80 bg-amber-50 flex flex-col justify-center items-center border-r-2 border-gray-400">
        <ul class="w-full">
            <hr>
            {#each links as link}
                <li>
                    <a class="block px-12 py-12 border-y-2 border-gray-400 hover:cursor-pointer text-2xl h-full"
                       class:bg-lime-300={$page.url.pathname === link.href}
                       class:border-transparent={$page.url.pathname !== link.href}
                       href="{link.href}">{link.name}</a>
                </li>
                <hr>
            {/each}
        </ul>
    </nav>

    <main class="absolute top-0 left-80 right-0 min-h-screen bg-amber-50">
        <slot/>
    </main>
</div>
