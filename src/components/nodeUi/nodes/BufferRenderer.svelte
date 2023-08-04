<script lang="ts">
	import type { P5RenderElement } from '$lib/appComponents/types'
	import BufferRenderer from '$lib/appComponents/BufferRenderer'
	import { Anchor, generateInput, generateOutput } from 'svelvet'
	import type { Position } from '$lib/fileSystem/types'
	import BaseNode from './BaseNode.svelte'

	export let id: string
	export let connections: string[]
	export let position: Position

	let instance: BufferRenderer

	interface Inputs {
		element: P5RenderElement[]
	}

	const initialData = {
		element: []
	}

	const inputs = generateInput(initialData)

	const processor = (inputs: Inputs) => {
		if (!instance && inputs.element[0]) {
			instance = new BufferRenderer(inputs.element[0])
		} else if (inputs.element[0]) {
			instance.element = inputs.element[0]
		}

		return [instance]
	}

	const output = generateOutput(inputs, processor)
</script>

<BaseNode
	width={250}
	height={100}
	{id}
	{connections}
	{position}
	label="Buffer Renderer"
	type="bufferRenderer"
>
	<div class="input-anchor">
		<Anchor key="element" inputsStore={inputs} input />
	</div>
	<div class="output-anchor">
		<Anchor outputStore={output} output />
	</div>
</BaseNode>

<style>
	.input-anchor {
		position: absolute;
		left: -6px;
		bottom: calc(50% - 20px);
	}

	.output-anchor {
		position: absolute;
		right: -6px;
		bottom: calc(50% - 20px);
	}
</style>
