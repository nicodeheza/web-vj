<script lang="ts">
	import ImageComponent from '$lib/appComponents/ImageComponent'
	import P5Canvas from '../../components/P5Canvas.svelte'
	import type P5 from 'p5'

	let posX = 0
	let posY = 0
	let scale = 1
	let rot = 0
	let pivotX = 0
	let pivotY = 0

	const sketch = (p5: P5) => {
		const asset = new ImageComponent('img/test.jpg', p5)

		p5.preload = () => {
			asset.preload()
		}
		p5.setup = () => {
			p5.pixelDensity(1)
			p5.createCanvas(600, 600, p5.WEBGL)
			asset.setup()
		}
		p5.draw = () => {
			p5.background(0, 0, 255)

			asset.draw()

			asset.scale = scale
			asset.x = posX
			asset.y = posY
			asset.rotation = rot
			asset.pivotX = pivotX
			asset.pivotY = pivotY
			if (!asset.output) return

			p5.image(asset.output, (p5.width / 2) * -1, (p5.height / 2) * -1, p5.width, p5.height)
		}
	}
</script>

<P5Canvas {sketch} />

<input type="range" bind:value={posX} min="-200" max="300" step="1" />
<input type="range" bind:value={posY} min="-200" max="300" step="1" />
<input type="range" bind:value={scale} min="0.001" max="2" step="0.01" />
<input type="range" bind:value={rot} min="0" max="2" step="0.001" />
<input type="range" bind:value={pivotX} min="-300" max="300" step="1" />
<input type="range" bind:value={pivotY} min="-300" max="300" step="1" />
