<script lang="ts">
	import VideoTexture from '$lib/appComponents/VideoTexture'
	import type { ImageTextureProps, Position, VideoTextureRecord } from '$lib/fileSystem/types'
	import { generateInput, generateOutput } from 'svelvet'
	import { nodeRecords } from 'store/nodes'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
	import TextureBase from './TextureBase.svelte'
	import {
		crateOrEditVideoTexture,
		deleteVideoTexture
	} from '$lib/workerActions/videoTextureActions'
	import { onMount } from 'svelte'

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

	const output = generateOutput(input, processor)

	function onLoad() {
		crateOrEditVideoTexture(textVal, id)
		if ($input.version.update) {
			$input.version.update((value) => value + 1)
		}
	}

	onMount(() => {
		if (textVal) {
			onLoad()
		}
	})

	function onDelete() {
		deleteVideoTexture(id)
	}
</script>

<TextureBase
	{onLoad}
	{onDelete}
	height={130}
	{id}
	{position}
	{connections}
	name="Video Buffer"
	bind:textVal
	outputStore={output}
/>
