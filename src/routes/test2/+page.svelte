<script lang="ts">
	import Composition from '$lib/appComponents/Composition'
	import ImageBuffer from '$lib/appComponents/ImageBuffer'
	import ImageComponent from '$lib/appComponents/ImageComponent'
	import Transformations from '$lib/appComponents/Transformations'
	import P5Canvas from '../../components/P5Canvas.svelte'
	import type P5 from 'p5'

	let posX = 0
	let posY = 0
	let scale = 1
	let rot = 0
	let pivotX = 0
	let pivotY = 0
	let showPivot = false

	const sketch = (p5: P5) => {
		const buffer = new ImageBuffer('img/test.jpg', p5)
		const trans = new Transformations(buffer, 600, 600, 'test', p5)
		const trans2 = new Transformations(buffer, 600, 600, 'test2', p5)
		const composition = new Composition()
		composition.add(trans)
		composition.add(trans2)
		composition.moveFront('test')

		p5.preload = () => {
			composition.preload()
		}
		p5.setup = () => {
			p5.pixelDensity(1)
			p5.createCanvas(600, 600, p5.WEBGL)
			composition.setup()
		}
		p5.draw = () => {
			p5.background(0, 0, 255)
			trans.scale = scale
			trans.x = posX
			trans.y = posY
			trans.rotation = rot
			trans.pivotX = pivotX
			trans.pivotY = pivotY
			trans.showPivot = showPivot

			composition.draw()
		}
	}
</script>

<P5Canvas {sketch} />

<input type="range" bind:value={posX} min="-300" max="300" step="1" />
<input type="range" bind:value={posY} min="-300" max="300" step="1" />
<input type="range" bind:value={scale} min="0.001" max="2" step="0.01" />
<input type="range" bind:value={rot} min="0" max="360" step="1" />
<input
	type="range"
	bind:value={pivotX}
	on:mousedown={() => (showPivot = true)}
	on:mouseup={() => (showPivot = false)}
	min="-300"
	max="300"
	step="1"
/>
<input
	type="range"
	bind:value={pivotY}
	on:mousedown={() => (showPivot = true)}
	on:mouseup={() => (showPivot = false)}
	min="-300"
	max="300"
	step="1"
/>
