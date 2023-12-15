<script lang="ts">
	import { resolution } from 'store/p5'
	import { ready, worker } from 'store/worker'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement
	let width: number
	let height: number

	$: {
		resolution.set({ w: width, h: height })
	}

	onMount(async () => {
		const Worker = await import('$lib/workers/graphics.worker?worker')
		$worker = new Worker.default()

		canvas.style.width = `${width}px`
		canvas.style.height = `${height}px`

		const view = canvas.transferControlToOffscreen()

		$worker.postMessage(
			{
				options: {
					width,
					height,
					resolution: window.devicePixelRatio,
					view,
					background: '0x000'
				}
			},
			[view]
		)

		$ready = true
	})
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
	<canvas bind:this={canvas} />
</div>

<style>
	div {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-color: black;
	}
</style>
