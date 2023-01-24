

<script>
    import { quadInOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
    
    
    let timeline = [
		{ year: 1995, label: "DHTML" },
		{ year: 2006, label: "jQuery" },
		{ year: 2010, label: "Angular 1" },
		{ year: 2013, label: "React" },
		{ year: 2019, label: "Svelte3" },
	]

    const width = 900
	let duration = 1000
	let index = tweened(0, {duration, easing: quadInOut})
	let dotSize = tweened(3, {duration: 200, easing: quadInOut})

</script>

<div class="cv">
    <svg viewBox="{-60+$index*200} 0 {width/timeline.length} 120">
        <line x1=20 y1=95 x2={30+($index*200)} y2=95 stroke=black/>
        
        {#each timeline as event, i}
            <g>
                <text class="label" x={25+i*40*timeline.length} y=20 text-anchor="middle">{event.label}</text>
                <text class="year" x={25+i*40*timeline.length} y=60 text-anchor="middle">{event.year}</text>
                <circle cx={25 + i*40*timeline.length} cy=95 r={$dotSize}/>
            </g>
        {/each}
        
    </svg>
</div>

<style lang="scss">
    .cv{
        padding: 1rem;
    }

    .timeline{
        
    }
</style>