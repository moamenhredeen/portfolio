<script>
    const projects = [
        {
            name: 'task manager',
            description: 'some description',
            href: '#',
            image: 'https://us.123rf.com/450wm/photochicken/photochicken2008/photochicken200800065/153425631-pritty-young-asian-photographer-girl-teen-travel-with-camera-trip-take-a-photo-tourist-lifestyle.jpg?ver=6',

        },
        {
            name: 'task manager',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen ',
            href: '#',
            image: 'https://plus.unsplash.com/premium_photo-1673697239984-b089baf7b6e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww&w=1000&q=80',

        },
    ]
</script>

<section class="p-12 flex gap-12">
    {#each projects as project}
        <div class="border-2 border-gray-400 w-80 h-80">
            <img src="{project.image}" alt="project preview image">
            <div class="p-2">
                <h3 class="text-2xl">{project.name}</h3>
                <p>{project.description.substring(0, 32)} {project.description.length > 32 &&  '...'}</p>
                <a href="#" class="block underline text-right">more info</a>
            </div>
        </div>
    {/each}
</section>
