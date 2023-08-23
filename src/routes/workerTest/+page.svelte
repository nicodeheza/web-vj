<script lang="ts">
	import { onMount } from 'svelte'

	let worker: Worker
	let canvas: HTMLCanvasElement

	onMount(async () => {
		const Worker = await import('$lib/workers/pixi.worker?worker')

		worker = new Worker.default()

		canvas.style.width = '600px'
		canvas.style.height = '600px'
		const view = canvas.transferControlToOffscreen()

		worker.postMessage(
			{
				options: {
					width: 600,
					height: 600,
					resolution: window.devicePixelRatio,
					view,
					background: '0x1099bb'
				}
			},
			[view]
		)
	})
</script>

<canvas bind:this={canvas} />
