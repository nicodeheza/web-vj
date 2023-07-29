<script>
	import P5ScreenRenderer from 'components/P5ScreenRenderer.svelte'
	import BufferRenderer from 'components/nodeUi/BufferRenderer.svelte'
	import Composition from 'components/nodeUi/Composition/index.svelte'
	import NodeCanvas from 'components/nodeUi/NodeCanvas.svelte'
	import Output from 'components/nodeUi/Output.svelte'
	import Transformation from 'components/nodeUi/Transformation.svelte'
	import ImageBuffer from 'components/nodeUi/buffers/ImageBuffer.svelte'
	import { bufferOutput } from 'store/p5'
</script>

<div class="videoOutput">
	<P5ScreenRenderer />
</div>
<div class="nodeUI">
	<NodeCanvas>
		<ImageBuffer />
		<!-- <ImageBuffer />
		<ImageBuffer /> -->
		<Transformation />
		<!-- <Transformation />
		<Transformation /> -->
		<Composition />
		<BufferRenderer />
		<Output />
	</NodeCanvas>
</div>

<style>
	.videoOutput,
	.nodeUI {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
