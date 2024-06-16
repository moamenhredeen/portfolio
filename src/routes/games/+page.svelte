<script>
    import snake from '$lib/images/anaconda.svg'
</script>


<input class="bg-transparent w-full border-gray-400 border-2 outline-none p-4 text-lg"
       type="text"
       placeholder="search games ...">

<ul class="my-12">
    <li class="flex gap-4">
        <img class="w-24" src={snake} alt="apple icon">
        <div>
            <a class="block text-2xl hover:underline" href="/games/snake">Snake Game</a>
        </div>
    </li>
</ul>