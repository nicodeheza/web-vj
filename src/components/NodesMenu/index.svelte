<script lang="ts">
	import {
		getBaseBufferRenderer,
		getBaseComposition,
		getBaseImageBuffer,
		getBaseTransformation
	} from '$lib/fileSystem/baseRecords'
	import { nodeRecords, type NodeRecord } from 'store/nodes'

	const names: Record<string, string> = {
		imageBuffer: 'Image Buffer',
		transformation: 'Screen element',
		bufferRenderer: 'Buffer Renderer',
		composition: 'Composition'
	}

	const baseElementsGetters: Record<string, () => NodeRecord> = {
		imageBuffer: getBaseImageBuffer,
		transformation: getBaseTransformation,
		bufferRenderer: getBaseBufferRenderer,
		composition: getBaseComposition
	}

	function addElement(type: string) {
		const element: NodeRecord = baseElementsGetters[type]()
		$nodeRecords.set(element.id, element)
		$nodeRecords = $nodeRecords
	}

	function onDrag(e: DragEvent, type: string) {
		e.dataTransfer?.setData('type', type)
	}
</script>

<section>
	{#each Object.keys(names) as nodeType (nodeType)}
		<button class={`${nodeType} button`} on:click={() => addElement(nodeType)}>
			<h3>{names[nodeType]}</h3>
		</button>
	{/each}
</section>

<style>
	.imageBuffer {
		background-color: var(--image-buffer-color);
	}

	.transformation {
		background-color: var(--transformation-color);
	}

	.bufferRenderer {
		background-color: var(--buffer-renderer-color);
	}

	.composition {
		background-color: var(--composition-color);
	}

	h3 {
		color: white;
	}
	section {
		position: absolute;
		top: 30px;
		left: 30px;
		display: flex;
		flex-direction: column;
		border-radius: 5%;
		overflow: hidden;
	}
	button {
		border: none;
		cursor: pointer;
	}

	:global(.grabbing *) {
		cursor: none !important;
	}
</style>
