<script lang="ts">
	import type BufferRenderer from '$lib/appComponents/BufferRenderer'
	import { Anchor, generateInput, generateOutput, Node } from 'svelvet'
	import { bufferOutput, reload } from 'store/p5'
	import CustomAnchor from './CustomAnchor.svelte'

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

<Node width={100} height={100} useDefaults>
	<div class="node">
		<div class="node-title name">
			<h1>Output</h1>
		</div>
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
	</div>
</Node>

<style>
	.node {
		padding: 0px 15px;
		margin-bottom: 20px;
	}
	.name {
		background-color: rgb(236, 75, 75);
	}

	.input-anchor {
		position: absolute;
		left: -6px;
		bottom: calc(50% - 20px);
	}
</style>
