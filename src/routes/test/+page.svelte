<script lang="ts">
	import P5Canvas from '../../components/P5Canvas.svelte';
	import type P5 from 'p5';

	let posX = 100;
	let posY = 100;
	let scale = 100;
	let rot = 0;
	let pivotX = 0;
	let pivotY = 0;

	const sketch = (p5: P5) => {
		let testShader: P5.Shader;
		let img: P5.Image;
		p5.preload = () => {
			testShader = p5.loadShader('shaders/test/test.vert', 'shaders/test/test.frag');
			img = p5.loadImage('img/test.jpg');
		};
		p5.setup = () => {
			p5.pixelDensity(1);
			p5.createCanvas(600, 600, p5.WEBGL);
			p5.noStroke();
			img.resize(p5.width, p5.height);
		};
		p5.draw = () => {
			p5.background(0);
			p5.shader(testShader);
			testShader.setUniform('uTexture', img);
			testShader.setUniform('uXpos', posX / 100 - 1);
			testShader.setUniform('uYpos', posY / 100 - 1);
			testShader.setUniform('uScale', (scale * 2) / 100);
			testShader.setUniform('uRotation', rot);
			testShader.setUniform('uPivotX', pivotX);
			testShader.setUniform('uPivotY', pivotY);
			p5.scale(0.5);
			p5.rect(0, 0, p5.width);
		};
	};
</script>

<P5Canvas {sketch} />

<input type="range" bind:value={posX} min="-200" max="300" step="1" />
<input type="range" bind:value={posY} min="-200" max="300" step="1" />
<input type="range" bind:value={scale} min="0" max="200" step="1" />
<input type="range" bind:value={rot} min="0" max="360" step="1" />
<input type="range" bind:value={pivotX} min="0" max="1" step="0.01" />
<input type="range" bind:value={pivotY} min="0" max="1" step="0.01" />
