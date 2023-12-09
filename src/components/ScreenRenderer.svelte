<script lang="ts">
	import { worker } from 'store/worker'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement
	let width: number
	let height: number

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
					background: '0x1099bb'
				}
			},
			[view]
		)
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
