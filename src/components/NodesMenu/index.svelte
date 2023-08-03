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

	function addElement(e: DragEvent, type: string) {
		e.preventDefault()
		const { clientX, clientY } = e
		const element: NodeRecord = {
			...baseElementsGetters[type](),
			position: {
				x: clientX,
				y: clientY
			}
		}

		$nodeRecords[element.id] = element
	}

	function onDrag(e: DragEvent, type: string) {
		e.preventDefault()
	}
</script>

<section>
	{#each Object.keys(names) as nodeType (nodeType)}
		<button
			class={`${nodeType} button`}
			draggable="true"
			on:dragend={(e) => {
				addElement(e, nodeType)
			}}
			on:drag={(e) => onDrag(e, nodeType)}
			on:drop={(e) => e.preventDefault()}
		>
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
		cursor: grab;
	}

	:global(.grabbing *) {
		cursor: none !important;
	}
</style>
