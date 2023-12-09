<script lang="ts">
	import VideoTexture from '$lib/appComponents/VideoTexture'
	import type { ImageTextureProps, Position, VideoTextureRecord } from '$lib/fileSystem/types'
	import { generateInput, generateOutput } from 'svelvet'
	import { nodeRecords } from 'store/nodes'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
	import BufferBase from './TextureBase.svelte'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ImageTextureProps

	let instance: VideoTexture
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
			const { props } = $nodeRecords.get(id) as VideoTextureRecord
			instance.uri = input.uri
			props.url = input.uri
			updateNodeRecordStorage($nodeRecords)
		} else {
			instance = new VideoTexture(input.uri)
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

	const play = () => instance?.play()
	const pause = () => instance?.pause()
	const stop = () => instance?.stop()
</script>

<BufferBase
	height={130}
	{id}
	{position}
	{connections}
	name="Video Buffer"
	bind:textVal
	outputStore={output}
>
	<div class="controls">
		<button on:click={play}>play</button>
		<button on:click={pause}>pause</button>
		<button on:click={stop}>stop</button>
	</div>
</BufferBase>

<style>
	.controls {
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		width: 100%;

		display: flex;
		justify-content: center;
		gap: 10px;
		margin-bottom: 15px;
	}

	.controls button {
		border: solid white 1px;
		border-radius: 5px;
		background-color: transparent;
		color: white;

		cursor: pointer;
	}
</style>
