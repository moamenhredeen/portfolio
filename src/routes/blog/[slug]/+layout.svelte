
<script>

    const  disqus_config = function () {
        this.page.url = 'moamenhredeen.github.io';
        this.page.identifier = 'moamenhredeen-github-io';
    };

    (function() {
        const d = document, s = d.createElement('script');
        s.src = 'https://moamenhredeen-github-io.disqus.com/embed.js';
        s.setAttribute('data-timestamp', + new Date());
        (d.head || d.body).appendChild(s);
    })();

</script>

<article class="p-4 m-auto w-full xl:w-1/2">
    <slot />
</article>
<div id="disqus_thread"
     class="my-12 w-full xl:w-1/2 m-auto"></div>
