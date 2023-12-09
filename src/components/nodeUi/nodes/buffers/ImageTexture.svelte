<script lang="ts">
	import { generateInput, generateOutput } from 'svelvet'
	import ImageTexture from '$lib/appComponents/ImageTexture'
	import BufferBase from './BufferBase.svelte'
	import type { ImageTextureProps, ImageTextureRecord, Position } from '$lib/fileSystem/types'
	import { nodeRecords } from 'store/nodes'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ImageTextureProps

	let instance: ImageTexture
	let textVal = props.url

	interface Input {
		uri: string
	}

	const initialData = {
		uri: textVal
	}

	const input = generateInput(initialData)

	const processor = (input: Input) => {
		if (instance) {
			const { props } = $nodeRecords.get(id) as ImageTextureRecord
			instance.uri = input.uri
			props.url = input.uri
			updateNodeRecordStorage($nodeRecords)
		} else {
			instance = new ImageTexture(input.uri)
		}
		return instance
	}

	let act = true
	$: if (textVal) {
		new Promise((r) => {
			act = false
			setTimeout(r, 2000)
		}).then(() => {
			act = true
		})
	}
	$: if ($input.uri.set && act) {
		$input.uri.set(textVal)
	}

	const output = generateOutput(input, processor)
</script>

<BufferBase {id} {position} {connections} name="Image Buffer" bind:textVal outputStore={output} />
