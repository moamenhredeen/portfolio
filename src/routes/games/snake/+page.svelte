<script lang="ts">

    import appleIcon from '$lib/images/apple.svg'
    import bombIcon from '$lib/images/bomb.svg'
    
    let started: boolean = $state(false);
    let current = $state({x: 0, y: 0})
    let snake: {x: number, y: number}[] = $state([{x: 0, y: 0}]);
    let game = $state([
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    let timers: number[]  = [];
    let length = 1;
    let direction: 'l'|'r'|'d'|'u' = 'r'


    function startGame(){
        if(started){
            return;
        }
        timers.push(setInterval(() => {
            move()
        }, 1000));

        timers.push(setInterval(() => {
            generate();
        }, 5000))
        started = true;
    }

    function resetGame(){
        timers.forEach(e => clearInterval(e))
        for (let i = 0; i < game.length - 1; i++) {
            for(let j = 0; j < game[i].length - 1; j++){
                game[i][j] = 0;
            }
        }

        started = false;
        current = {x: 0, y: 0};
        snake = [{...current}]
        direction = 'r';
    }



    function generate(){
        const randi = Math.floor(Math.random() * (game.length - 1))
        const randj = Math.floor(Math.random() * (game.length - 1))
        if(randi > (game.length - 1) * 3 / 4){
            game[randi][randj] = -1;
        }else {
            game[randi][randj] = 1
        }
    }

    function onKeyDown(e: KeyboardEvent){
        if(!started) return;
        switch(e.key){
            case 'ArrowDown':
            case 'j':
                direction = 'd';
                break;
            case 'k':
            case 'ArrowUp':
                direction = 'u';
                break;
            case 'ArrowRight':
            case 'l':
                direction = 'r';
                break;
            case 'ArrowLeft':
            case 'h':
                direction = 'l';
                break;
            default:
                return;
        }
        move();
    }


    function move(){
        switch(direction){
            case 'd': current.y++; break;
            case 'u': current.y--; break;
            case 'r': current.x++; break;
            case 'l': current.x--; break;
        }

        if      (current.x >= game.length)      current.x = 0
        else if (current.x < 0)                 current.x = game.length - 1;
        if      (current.y >= game[0].length)   current.y = 0
        else if (current.y < 0)                 current.y = game[0].length - 1;


        switch (game[current.y][current.x]){
            case  1: snake = [...snake, {...current}];          break;
            case -1: snake = [{...current}];                    break;
            default: snake = [...snake.slice(1), {...current}]; break;
        }
        game[current.y][current.x] = 0
    }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown}></svelte:window>
<h1 class="text-4xl text-center m-4">Snake Game</h1>
<table class="m-auto border-separate border-4 border-amber-200">
    <tbody>
    {#each game as row, i}
        <tr>
        {#each row as cell, j}
            {#if current.x === j && current.y === i}
                <td class="rounded-2xl border-4 border-pink-400 p-8 bg-pink-200"></td>
            {:else if snake.some(e => e.x === j  && e.y === i)}
                <td class="rounded-xl border-4 border-lime-400 p-8 bg-lime-200"></td>
            {:else if cell === -1}
                <td>
                    <img src={bombIcon} alt="">
                </td>
            {:else if cell === 1}
                <td>
                    <img src={appleIcon} alt="">
                </td>
            {:else}
                <td class="border-4 border-transparent p-8"></td>
            {/if}
        {/each}
        </tr>
    {/each}
    </tbody>
</table>

{#if started}
    <div class="flex justify-center items-center p-4">
        <button onclick={resetGame}
                class="bg-red-200 border-4 border-red-400 px-8 py-2 hover:cursor-pointer hover:bg-red-300">Reset</button>
    </div>
{:else}
    <div class="flex justify-center items-center p-4">
        <button onclick={startGame}
                class="bg-cyan-200 border-4 border-cyan-400 px-8 py-2 hover:cursor-pointer hover:bg-cyan-300">Start
        </button>
    </div>
{/if}


<style>

</style>