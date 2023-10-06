<script lang="ts">
    import myImage from './moamen-hraden.1024x1024.jpg'

    import github from './img/github.svg'
    import xing from './img/xing.svg'
    import linkedin from './img/linkedin.svg'
    import gmail from './img/gmail.svg'

    let personalInfo = [
        {key: 'Email', value: 'mailto:moamenhredeen@gmail.com', icon: gmail},
        {key: 'Github', value: 'https://github.com/moamenhredeen', icon: github},
        {key: 'Xing', value: 'https://www.xing.com/profile/moamen_hraden5/cv', icon: xing},
        {key: 'LinkedIn', value: 'https://www.linkedin.com/in/moamen-hraden-1b01551b5/', icon: linkedin},
    ]

    let skills = [
        {name: 'Java / Spring', level: 75},
        {name: '.NET / Asp.Net Core', level: 75},
        {name: 'NodeJs', level: 75},
        {name: 'Angular', level: 75},
        {name: 'Flutter', level: 75},
        {name: 'Svelte', level: 50},
        {name: 'React', level: 50},
        {name: 'Golang', level: 50},
    ]
</script>

<section class="p-8">
    <div class="flex gap-8">
        <img class="border-2 p-1 border-gray-400 h-80 w-80" src="{myImage}" alt="me :)">
        <div class="">
            <h1 class="text-4xl">Moamen Hredeen</h1>
            <ul>
                {#each personalInfo as item}
                    <li>
                        <a class="block hover:underline my-4"
                           href="{item.value}">
                            <img src="{item.icon}"
                                 class="inline w-8 h-8 mr-2"
                                 alt="link icon">
                            <!--<span class="font-bold">{item.key}: </span>-->
                            {item.value}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <hr class="my-8 w-1/2">

    <div>
        <h1 class="text-4xl">Skills</h1>

        <table class="mt-4">
            {#each skills as skill}
                <tr>
                    <td class="text-l italic">{skill.name}</td>
                    <td class="px-2">
                        {#if skill.level >= 66 }
                            <span class="block rounded-xl w-96 h-2 bg-lime-400"></span>
                        {:else if skill.level >= 33 }
                            <span class="block  rounded-xl w-64 h-2 bg-amber-400"></span>
                        {:else}
                            <span class="block  rounded-xl w-32 h-2 bg-red-400"></span>
                        {/if}
                    </td>
                </tr>
            {/each}
        </table>
    </div>


    <hr class="my-8 w-1/2">

</section>
