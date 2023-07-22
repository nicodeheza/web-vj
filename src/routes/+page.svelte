<script>
	import P5ScreenRenderer from 'components/P5ScreenRenderer.svelte'
	import NodeCanvas from 'components/nodeUi/NodeCanvas.svelte'
	import Transformation from 'components/nodeUi/Transformatio.svelte'
	import ImageBuffer from 'components/nodeUi/buffers/ImageBuffer.svelte'
</script>

<div class="videoOutput">
	<P5ScreenRenderer />
</div>
<div class="nodeUI">
	<NodeCanvas>
		<ImageBuffer />
		<Transformation />
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
