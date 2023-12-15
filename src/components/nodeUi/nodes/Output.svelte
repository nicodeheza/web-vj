<script lang="ts">
	import { Anchor, generateInput, generateOutput } from 'svelvet'
	import CustomAnchor from './anchors/CustomAnchor.svelte'
	import BaseNode from './BaseNode.svelte'
	import type { Position } from '$lib/fileSystem/types'
	import { addChild } from '$lib/workerActions/outputActions'

	export let position: Position
	export let connections: string[]
	let isConnecting = false

	interface Input {
		element: { id: string; type: string }
	}

	const initialData = {
		element: { id: '', type: '' }
	}

	const inputs = generateInput(initialData)

	const acceptedTypes = ['imageElement']

	const processor = (input: Input) => {
		if (acceptedTypes.includes(input.element.type)) {
			const { id, type } = input.element
			addChild(id, type)
		}
		return {}
	}

	generateOutput(inputs, processor)
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
		<Anchor
			key="element"
			multiple
			let:connecting
			let:hovering
			let:linked
			inputsStore={inputs}
			input
		>
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
