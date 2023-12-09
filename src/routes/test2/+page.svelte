<script lang="ts">
	import BufferRenderer from '$lib/appComponents/BufferRenderer'
	import Composition from '$lib/appComponents/Composition'
	import ImageTexture from '$lib/appComponents/ImageTexture'
	import Shader from '$lib/appComponents/Shader'
	import Elements from '$lib/appComponents/Element'
	import VideoTexture from '$lib/appComponents/VideoTexture'
	import P5Canvas from 'components/P5Canvas.svelte'
	import type P5 from 'p5'

	let posX = 0
	let posY = 0
	let scale = 1
	let rot = 0
	let pivotX = 0
	let pivotY = 0
	let showPivot = false

	const sketch = (p5: P5) => {
		const buffer = new ImageTexture('img/test.jpg', p5)
		const buffer2 = new VideoTexture('vid/test.mp4', p5)
		const shader = new Shader(p5)
		shader.setShader('shaders/invert/invert.vert', 'shaders/invert/invert.frag')
		shader.setImageU(buffer2)
		const trans = new Elements(buffer, 600, 600, 'test', p5)
		const trans2 = new Elements(shader, 600, 600, 'test2', p5)
		const composition = new Composition()
		composition.add(trans)
		composition.add(trans2)

		const renderer = new BufferRenderer(composition, p5)
		// composition.moveFront('test')

		p5.preload = () => {
			renderer.preload()
		}
		p5.setup = () => {
			p5.pixelDensity(1)
			p5.createCanvas(600, 600, p5.WEBGL)
			p5.noStroke()
			renderer.setup()
		}
		p5.draw = () => {
			if (!renderer.img) return
			p5.background(0, 0, 255)
			trans2.scale = scale
			trans2.x = posX
			trans2.y = posY
			trans2.rotation = rot
			trans2.pivotX = pivotX
			trans2.pivotY = pivotY
			trans2.showPivot = showPivot

			renderer.draw()
			p5.image(renderer.img, 0 - p5.width / 2, 0 - p5.height / 2)
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
