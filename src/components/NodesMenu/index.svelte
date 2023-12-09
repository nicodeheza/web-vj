<script lang="ts">
	import {
		getBaseBufferRenderer,
		getBaseComposition,
		getBaseImageTexture,
		getBaseElement,
		getBaseVideoTexture
	} from '$lib/fileSystem/baseRecords'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
	import { nodeRecords, type NodeRecord } from 'store/nodes'

	const names: Record<string, string> = {
		imageTexture: 'Image Buffer',
		videoTexture: 'Video Buffer',
		element: 'Screen element',
		bufferRenderer: 'Buffer Renderer',
		composition: 'Composition'
	}

	const baseElementsGetters: Record<string, () => NodeRecord> = {
		imageTexture: getBaseImageTexture,
		videoTexture: getBaseVideoTexture,
		element: getBaseElement,
		bufferRenderer: getBaseBufferRenderer,
		composition: getBaseComposition
	}

	function addElement(type: string) {
		const element: NodeRecord = baseElementsGetters[type]()
		$nodeRecords.set(element.id, element)
		$nodeRecords = $nodeRecords
		updateNodeRecordStorage($nodeRecords)
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
	.imageTexture,
	.videoTexture {
		background-color: var(--image-buffer-color);
	}

	.element {
		background-color: var(--element-color);
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
