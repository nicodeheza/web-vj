<script lang="ts">
	import { generateInput, generateOutput } from 'svelvet'
	import BufferBase from './TextureBase.svelte'
	import type { ImageTextureProps, ImageTextureRecord, Position } from '$lib/fileSystem/types'
	import { worker } from 'store/worker'
	import { nodeRecords } from 'store/nodes'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
	import { onMount } from 'svelte'
	import { crateOrEditImageTexture } from '$lib/workerActions/imageTextureActions'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ImageTextureProps

	let textVal = props.url

	interface Input {
		id: string
		type: string
		version: number
	}

	const initialData = {
		id,
		type: 'imageTexture',
		version: 0
	}

	const input = generateInput(initialData)

	const processor = (input: Input) => {
		return input
	}

	function onLoad() {
		const { props } = $nodeRecords.get(id) as ImageTextureRecord
		if (textVal !== props.url) {
			props.url = textVal
			updateNodeRecordStorage($nodeRecords)
		}

		crateOrEditImageTexture(textVal, id)

		if ($input.version.update) {
			$input.version.update((value) => value + 1)
		}
	}

	const output = generateOutput(input, processor)

	onMount(() => {
		if (textVal) {
			onLoad()
		}
	})
</script>

<BufferBase
	{onLoad}
	{id}
	{position}
	{connections}
	name="Image Buffer"
	bind:textVal
	outputStore={output}
/>
