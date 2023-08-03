<script lang="ts">
	import P5ScreenRenderer from 'components/P5ScreenRenderer.svelte'
	import BufferRenderer from 'components/nodeUi/nodes/BufferRenderer.svelte'
	import Composition from 'components/nodeUi/nodes/Composition/index.svelte'
	import NodeCanvas from 'components/nodeUi/NodeCanvas.svelte'
	import Output from 'components/nodeUi/nodes/Output.svelte'
	import Transformation from 'components/nodeUi/nodes/Transformation.svelte'
	import ImageBuffer from 'components/nodeUi/nodes/buffers/ImageBuffer.svelte'
	import NodeMenu from 'components/NodesMenu/index.svelte'
	import { nodeRecords } from 'store/nodes'
</script>

<div class="videoOutput">
	<P5ScreenRenderer />
</div>
<div class="nodeUI">
	<NodeCanvas>
		{#each $nodeRecords.values() as record (record.id)}
			{#if record.type === 'imageBuffer'}
				<ImageBuffer
					id={record.id}
					connections={record.connections}
					position={record.position}
					props={record.props}
				/>
			{:else if record.type === 'transformation'}
				<Transformation
					id={record.id}
					connections={record.connections}
					position={record.position}
					props={record.props}
				/>
			{:else if record.type === 'bufferRenderer'}
				<BufferRenderer
					id={record.id}
					connections={record.connections}
					position={record.position}
				/>
			{:else if record.type === 'composition'}
				<Composition id={record.id} connections={record.connections} position={record.position} />
			{/if}
		{/each}
		<Output
			position={$nodeRecords.get('output')?.position || { x: 0, y: 0 }}
			connections={$nodeRecords.get('output')?.connections || []}
		/>
	</NodeCanvas>
	<NodeMenu />
</div>

<style>
	:global(:root) {
		--buffer-renderer-color: rgb(202, 116, 59);
		--output-color: rgb(236, 75, 75);
		--transformation-color: rgb(1, 128, 128);
		--image-buffer-color: rgb(139, 0, 70);
		--composition-color: rgb(0, 112, 209);
	}
	.videoOutput,
	.nodeUI {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
