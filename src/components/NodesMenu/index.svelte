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
</script>

<section>
	{#each Object.keys(names) as nodeType (nodeType)}
		<button
			draggable="true"
			on:dragend={(e) => {
				addElement(e, nodeType)
			}}
		>
			<h3>{names[nodeType]}</h3>
		</button>
	{/each}
</section>

<style>
	section {
		position: absolute;
		top: 30px;
		left: 30px;
		display: flex;
		flex-direction: column;
	}
</style>
