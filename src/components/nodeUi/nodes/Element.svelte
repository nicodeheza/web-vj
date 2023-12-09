<script lang="ts">
	import type { Position, ElementProps, ElementRecord } from '$lib/fileSystem/types'
	import { resolution } from 'store/p5'
	import { Anchor, Slider, generateInput, generateOutput } from 'svelvet'
	import BaseNode from './BaseNode.svelte'
	import { crateImageElementOrReplaceTexture } from '$lib/workerActions/imageElementActions'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ElementProps

	let name: string = props.name
	let texture = { id: '', version: 0 }

	interface Inputs {
		id: string
		type: string
		x: number
		y: number
		rotation: number
		scale: number
		pivotX: number
		pivotY: number
		parent: { id: string; type: string; version: number }
		name: string
	}

	const initialData = {
		...props,
		buffer: '',
		parent: { id: '', type: '', version: 0 },
		type: 'imageElement',
		id
	}

	const inputs = generateInput(initialData)

	const processor = (inputs: Inputs) => {
		//TODO - add transformations
		// const { props: nodeProps } = $nodeRecords.get(id) as ElementRecord
		// nodeProps.x = inputs.x
		// nodeProps.y = inputs.y
		// nodeProps.rotation = inputs.rotation
		// nodeProps.scale = inputs.scale
		// nodeProps.pivotX = inputs.pivotX
		// nodeProps.pivotY = inputs.pivotY
		// nodeProps.name = inputs.name

		// updateNodeRecordStorage($nodeRecords)

		const parent = inputs.parent
		if (
			parent.type === 'imageTexture' &&
			(texture.id !== parent.id || parent.version !== texture.version)
		) {
			crateImageElementOrReplaceTexture(parent.id, id)
			texture.id = parent.id
			texture.version = parent.version
		}

		return { id: inputs.id, type: inputs.type }
	}

	const output = generateOutput(inputs, processor)

	$: if ($inputs?.name?.set) {
		$inputs.name.set(name)
	}
</script>

<BaseNode
	width={250}
	height={270}
	{id}
	{connections}
	{position}
	type="element"
	label="Screen element"
>
	<div class="sliders">
		<input type="text" placeholder="Name" bind:value={name} />
		<Slider
			parameterStore={$inputs.x}
			min={$resolution.w * -2}
			max={$resolution.w * 2}
			label="x"
			fixed={0}
		/>
		<Slider
			parameterStore={$inputs.y}
			min={$resolution.h * -2}
			max={$resolution.h * 2}
			label="y"
			fixed={0}
		/>
		<Slider parameterStore={$inputs.rotation} min={-360} max={360} label="Rotation" fixed={0} />
		<Slider parameterStore={$inputs.scale} min={0} max={10} step={0.01} label="Scale" />
		<div role="button" tabindex={1}>
			<Slider
				parameterStore={$inputs.pivotX}
				min={$resolution.w * -1}
				max={$resolution.w}
				label="Pivote x"
				fixed={0}
			/>
		</div>
		<div role="button" tabindex={2}>
			<Slider
				parameterStore={$inputs.pivotY}
				min={$resolution.h * -1}
				max={$resolution.h}
				label="Pivote y"
				fixed={0}
			/>
		</div>
	</div>
	<div class="input-anchor">
		<Anchor key="parent" inputsStore={inputs} input />
	</div>
	<div class="output-anchor">
		<Anchor outputStore={output} output />
	</div>
</BaseNode>

<style>
	.sliders {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	:global(.sliders button) {
		color: rgb(216, 216, 216) !important;
	}

	.sliders input {
		align-self: center;
		width: 140px;
		border-radius: 7px;
		height: 22px;
		padding-left: 10px;
	}

	.input-anchor {
		position: absolute;
		left: -6px;
		bottom: 118px;
	}

	.output-anchor {
		position: absolute;
		right: -6px;
		bottom: 118px;
	}
</style>
