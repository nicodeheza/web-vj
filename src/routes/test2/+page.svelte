<script lang="ts">
	import ImageBuffer from '$lib/appComponents/ImageBuffer'
	import ImageComponent from '$lib/appComponents/ImageComponent'
	import Transformations from '$lib/appComponents/Transformations'
	import P5Canvas from '../../components/P5Canvas.svelte'
	import type P5 from 'p5'

	// let posX = 0
	// let posY = 0
	// let scale = 1
	// let rot = 0
	// let pivotX = 0
	// let pivotY = 0

	const sketch = (p5: P5) => {
		const buffer = new ImageBuffer('img/test.jpg', p5)
		const trans = new Transformations(buffer, 600, 600, p5)

		p5.preload = () => {
			trans.preload()
		}
		p5.setup = () => {
			p5.pixelDensity(1)
			p5.createCanvas(600, 600, p5.WEBGL)
			trans.setup()
		}
		p5.draw = () => {
			p5.background(0, 0, 255)
			// trans.scale = scale
			// trans.x = posX
			// trans.y = posY
			// trans.rotation = rot
			// pivotX = trans.pivotX
			// pivotY = trans.pivotY
			// trans.pivotX = pivotX
			// trans.pivotY = pivotY

			trans.draw()
		}
		p5.keyPressed = () => {
			trans.keyPressed()
		}
		p5.mousePressed = () => {
			trans.mousePressed()
		}
		p5.mouseDragged = () => {
			trans.mouseDragged()
		}
		p5.mouseReleased = () => {
			trans.mouseReleased()
		}
	}
</script>

<P5Canvas {sketch} />

<!-- <input type="range" bind:value={posX} min="-300" max="300" step="1" />
<input type="range" bind:value={posY} min="-300" max="300" step="1" />
<input type="range" bind:value={scale} min="0.001" max="2" step="0.01" />
<input type="range" bind:value={rot} min="0" max="360" step="1" />
<input type="range" bind:value={pivotX} min="-300" max="300" step="1" />
<input type="range" bind:value={pivotY} min="-300" max="300" step="1" /> -->
