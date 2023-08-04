<script lang="ts">
	import type BufferRenderer from '$lib/appComponents/BufferRenderer'
	import { Anchor, generateInput, generateOutput } from 'svelvet'
	import { bufferOutput, reload } from 'store/p5'
	import CustomAnchor from './anchors/CustomAnchor.svelte'
	import BaseNode from './BaseNode.svelte'
	import type { Position } from '$lib/fileSystem/types'

	export let position: Position
	export let connections: string[]
	let isConnecting = false

	interface Input {
		element: BufferRenderer[]
	}

	const initialData = {
		element: []
	}

	const inputs = generateInput(initialData)

	const processor = (input: Input) => {
		if (input.element[0] && isConnecting) {
			bufferOutput.set(input.element[0])
			$reload = true
		}
		return input.element[0]
	}

	const output = generateOutput(inputs, processor)
</script>

<BaseNode
	width={100}
	height={100}
	{position}
	{connections}
	id="output"
	type="output"
	label="Output"
>
	<div class="input-anchor">
		<Anchor key="element" let:connecting let:hovering let:linked inputsStore={inputs} input>
			<CustomAnchor
				{connecting}
				{hovering}
				{linked}
				on:connecting={(e) => {
					isConnecting = e.detail
				}}
			/>
		</Anchor>
	</div>
</BaseNode>

<style>
	.input-anchor {
		position: absolute;
		left: -6px;
		bottom: calc(50% - 20px);
	}
</style>
