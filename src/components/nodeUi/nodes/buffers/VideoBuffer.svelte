<script lang="ts">
	import VideoBuffer from '$lib/appComponents/VideoBuffer'
	import type { ImageBufferProps, Position, VideoBufferRecord } from '$lib/fileSystem/types'
	import { generateInput, generateOutput } from 'svelvet'
	import { nodeRecords } from 'store/nodes'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
	import BufferBase from './BufferBase.svelte'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ImageBufferProps

	let instance: VideoBuffer
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
			const { props } = $nodeRecords.get(id) as VideoBufferRecord
			instance.uri = input.uri
			props.url = input.uri
			updateNodeRecordStorage($nodeRecords)
		} else {
			instance = new VideoBuffer(input.uri)
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

<BufferBase {id} {position} {connections} name="Video Buffer" bind:textVal outputStore={output} />
