<script lang="ts">
	import type P5 from 'p5'
	import { bufferOutput, resolution, reload } from 'store/p5'
	import P5Canvas from './P5Canvas.svelte'
	let w: number
	let h: number

	$: {
		resolution.set({ w, h })
	}

	// $:if($bufferOutput){

	// }

	const sketch = (p5: P5) => {
		if ($bufferOutput) {
			$bufferOutput.install(p5)
		}
		p5.preload = () => {
			if ($bufferOutput) {
				$bufferOutput.preload()
			}
		}

		p5.setup = () => {
			p5.pixelDensity(1)
			p5.createCanvas(w, h, p5.WEBGL)
			p5.noStroke()
			if ($bufferOutput) {
				$bufferOutput.setup()
			}
		}

		p5.draw = () => {
			if ($reload && $bufferOutput) {
				$bufferOutput.install(p5)
				p5.preload()
				p5.setup()
				$reload = false
			}
			if (!$bufferOutput.img) return
			p5.background(0, 0, 0)

			$bufferOutput.draw()
			p5.image($bufferOutput.img, 0 - p5.width / 2, 0 - p5.height / 2)
		}
	}
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
	{#if $bufferOutput}
		<P5Canvas {sketch} />
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		background-color: black;
	}
</style>
