<script>

    import {onMount} from "svelte";

    onMount(() => {
        var disqus_config = function () {
            this.page.url = 'moamenhredeen.github.io';
            this.page.identifier = 'moamenhredeen-github-io';
        };

        (function () {
            var d = document, s = d.createElement('script');
            s.src = 'https://moamenhredeen-github-io.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    });

</script>

<article>
    <slot/>
</article>
<hr class="my-8">
<div id="disqus_thread"></div>
