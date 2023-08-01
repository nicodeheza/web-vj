<script lang="ts">
	import {
		getBaseBufferRenderer,
		getBaseComposition,
		getBaseImageBuffer,
		getBaseTransformation
	} from '$lib/fileSystem/baseRecords'
	import P5ScreenRenderer from 'components/P5ScreenRenderer.svelte'
	import BufferRenderer from 'components/nodeUi/BufferRenderer.svelte'
	import Composition from 'components/nodeUi/Composition/index.svelte'
	import NodeCanvas from 'components/nodeUi/NodeCanvas.svelte'
	import Output from 'components/nodeUi/Output.svelte'
	import Transformation from 'components/nodeUi/Transformation.svelte'
	import ImageBuffer from 'components/nodeUi/buffers/ImageBuffer.svelte'
	import NodeMenu from 'components/NodesMenu/index.svelte'
	import { nodeRecords } from 'store/nodes'
	import { onMount } from 'svelte'

	// onMount(() => {
	// 	$nodeRecords = [
	// 		getBaseImageBuffer(),
	// 		getBaseTransformation(),
	// 		getBaseComposition(),
	// 		getBaseBufferRenderer()
	// 	].reduce((acc, ele) => ({ ...acc, [ele.id]: ele }), {})
	// })
</script>

<div class="videoOutput">
	<P5ScreenRenderer />
</div>
<div class="nodeUI">
	<NodeCanvas>
		{#each Object.values($nodeRecords) as record (record.id)}
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
		<Output />
	</NodeCanvas>
	<NodeMenu />
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
