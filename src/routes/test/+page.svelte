<script lang="ts">
	import P5Canvas from '../../components/P5Canvas.svelte';
	import type P5 from 'p5';

	const sketch = (p5: P5) => {
		p5.setup = () => {
			p5.createCanvas(100, 100);
			p5.background(0);
		};
	};
</script>

<P5Canvas {sketch} />
