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

    let experience = [
        {
            date: '2021 - present',
            company: 'Primion Technology GmbH',
            description: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eveniet modi,
            ut facilis sequi corporis quidem vitae, reprehenderit autem dolorum
            rerum doloribus totam unde neque labore? Earum veniam temporibus porro?`
        },
        {
            date: '2020 - 2021',
            company: 'Vinnova (Viscan)',
            description: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eveniet modi,
            ut facilis sequi corporis quidem vitae, reprehenderit autem dolorum
            rerum doloribus totam unde neque labore? Earum veniam temporibus porro?`
        },
        {
            date: '2019 - 2020',
            company: 'Hochschule Albstadt-Sigmaringen',
            description: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eveniet modi,
            ut facilis sequi corporis quidem vitae, reprehenderit autem dolorum
            rerum doloribus totam unde neque labore? Earum veniam temporibus porro?`
        },
    ]

</script>

<div class="flex flex-col lg:flex-row gap-8">
    <img class="border-2 p-1 border-gray-400 h-48 w-48" src="{myImage}" alt="me :)">
    <div>
        <h1 class="text-4xl">Moamen Hredeen</h1>
        <p class="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eveniet modi,
            ut facilis sequi corporis quidem vitae, reprehenderit autem dolorum
            rerum doloribus totam unde neque labore? Earum veniam temporibus porro?
        </p>
        <ul class="flex justify-around">
            {#each personalInfo as item}
                <li>
                    <a class="hover:underline flex flex-col items-center"
                       href="{item.value}">
                        <img src="{item.icon}"
                             class="inline w-8 h-8"
                             alt="link icon">
                        <!--<span class="font-bold">{item.key}: </span>-->
                        {item.key}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<hr class="my-8 w-1/2">

<div>
    <h1 class="text-4xl">Experience</h1>
    <ul class="flex flex-col py-12">
        {#each experience as item}
            <li class="flex items-start">
                <div class="flex items-center translate-x-2">
                    <span class="bg-amber-200 w-32 p-1 px-2 my-2 text-center text-gray-800 rounded">{item.date}</span>
                    <span class="bg-amber-200 w-8 h-0.5"></span>
                    <span class="bg-amber-200 h-4 w-4 rounded-xl"></span>
                </div>
                <div class="border-l-2 border-amber-200 p-2 pb-12 px-8">
                    <h2 class="text-2xl pb-2">{item.company}</h2>
                    <p>{item.description}</p>
                </div>
            </li>
        {/each}
    </ul>
</div>


<hr class="my-8 w-1/2">