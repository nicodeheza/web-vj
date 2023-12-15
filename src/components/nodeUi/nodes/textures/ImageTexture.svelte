<script lang="ts">
	import { generateInput, generateOutput } from 'svelvet'
	import TextureBase from './TextureBase.svelte'
	import type { ImageTextureProps, Position } from '$lib/fileSystem/types'
	import { onMount } from 'svelte'
	import {
		crateOrEditImageTexture,
		deleteImageTexture
	} from '$lib/workerActions/imageTextureActions'

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
		crateOrEditImageTexture(textVal, id)
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
		deleteImageTexture(id)
	}
</script>

<TextureBase
	{onLoad}
	{onDelete}
	{id}
	{position}
	{connections}
	name="Image Texture"
	bind:textVal
	outputStore={output}
/>
