<script lang="ts">
	import type P5 from 'p5'
	import { onMount } from 'svelte'
	export let sketch: (p5: P5) => void

	let element: HTMLDivElement
	let instance: P5

	onMount(async () => {
		if (!element && window) return
		if (instance) return
		const lib = await import('p5')
		const { default: P5 } = lib
		instance = new P5(sketch, element)
	})
</script>

<div bind:this={element} />
