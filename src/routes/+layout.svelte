<script lang="ts">
    import {page} from "$app/state";

    const links = [
        {name: "Home",      href: "/"},
        {name: "Projects",  href: "/projects"},
        {name: "Blog",      href: "/blog"},
        {name: "About",     href: "/about"},
    ]

</script>

<div class="root-container">

    <nav>
        <h1>YU</h1>
        <ul>
            {#each links as link}
                <li>
                    <a class:active={link.href === page.url.pathname}
                       href="{link.href}">
                        {link.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>


    <main>
        <slot/>
    </main>

    <footer>
        <p>© 2025 Moamen Hredeen | Full-Stack Developer</p>
    </footer>

</div>


<style>
    :global(html, body) {
        font-family: "JetBrainsMono NF", sans-serif;
        padding: 0;
        margin: 0;
    }

    .root-container{
        width: 50%;
        min-height: 100vh;
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }

    footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        border-top: 1px solid black;
        margin-top: 1rem;
    }

    nav{
        display: flex;
        justify-content: space-between;
        ul{
            list-style: none;
            display: flex;
            gap: 1rem;
            li > a{
                display: block;
                text-decoration: none;
                color: inherit;
                &:hover{
                    text-decoration: underline;
                }
                &.active{
                    color: red;
                }
            }
        }
    }
</style>