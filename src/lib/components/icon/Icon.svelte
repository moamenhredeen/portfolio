<script lang="ts">
    export let name;
    export let width = "2rem";
    export let height = "2rem";
    import { icons } from "./icons";
    const icon = icons[name]
</script>


<svg 
    {width} 
    {height}
    viewBox="0 0 {icon.box} {icon.box}">
    {@html icon.path}
</svg>