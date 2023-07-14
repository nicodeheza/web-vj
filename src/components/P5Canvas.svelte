<script lang="ts">
	import type P5 from 'p5'
	import { onMount } from 'svelte'
	export let sketch: (p5: P5) => void

	let element: HTMLDivElement

	onMount(async () => {
		const lib = await import('p5')
		const { default: P5 } = lib
		if (!element && window) return
		new P5(sketch, element)
	})
</script>

<div bind:this={element} />
