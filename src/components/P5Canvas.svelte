<script lang="ts">
	import type P5 from 'p5'
	import { onMount } from 'svelte'
	import { globalP5 } from '../store/p5'

	export let sketch: (p5: P5) => void

	let element: HTMLDivElement

	onMount(async () => {
		const lib = await import('p5')
		const { default: P5 } = lib
		if (!element && window) return
		if ($globalP5) return
		const instance = new P5(sketch, element)
		globalP5.set(instance)
	})
</script>

<div bind:this={element} />
