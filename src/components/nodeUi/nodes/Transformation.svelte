<script lang="ts">
	import Transformations from '$lib/appComponents/Transformation'
	import type { BufferI } from '$lib/appComponents/types'
	import type { Position, TransformationProps, TransformationRecord } from '$lib/fileSystem/types'
	import { resolution } from 'store/p5'
	import { Anchor, Slider, generateInput, generateOutput } from 'svelvet'
	import BaseNode from './BaseNode.svelte'
	import { nodeRecords } from 'store/nodes'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: TransformationProps

	let instance: Transformations
	let name: string = props.name

	interface Inputs {
		x: number
		y: number
		rotation: number
		scale: number
		pivotX: number
		pivotY: number
		buffer: BufferI | boolean
		name: string
	}

	const initialData = {
		...props,
		buffer: false
	}

	const inputs = generateInput(initialData)

	const processor = (inputs: Inputs) => {
		if (instance) {
			const { props: nodeProps } = $nodeRecords.get(id) as TransformationRecord
			instance.x = inputs.x
			nodeProps.x = inputs.x

			instance.y = inputs.y
			nodeProps.y = inputs.y

			instance.rotation = inputs.rotation
			nodeProps.rotation = inputs.rotation

			instance.scale = inputs.scale
			nodeProps.scale = inputs.scale

			instance.pivotX = inputs.pivotX
			nodeProps.pivotX = inputs.pivotX

			instance.pivotY = inputs.pivotY
			nodeProps.pivotY = inputs.pivotY

			instance.name = inputs.name
			nodeProps.name = inputs.name

			instance.buffer = inputs.buffer as BufferI

			updateNodeRecordStorage($nodeRecords)
		} else if (inputs.buffer) {
			instance = new Transformations(
				inputs.buffer as BufferI,
				$resolution.w,
				$resolution.h,
				inputs.name,
				id
			)
		}

		return [instance]
	}

	const output = generateOutput(inputs, processor)

	$: if ($inputs?.name?.set) {
		$inputs.name.set(name)
	}

	function showPivote(val: boolean) {
		if (!instance) return
		instance.showPivot = val
	}
</script>

<BaseNode
	width={250}
	height={270}
	{id}
	{connections}
	{position}
	type="transformation"
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
		<div
			on:mouseenter={() => showPivote(true)}
			on:mouseleave={() => showPivote(false)}
			role="button"
			tabindex={1}
		>
			<Slider
				parameterStore={$inputs.pivotX}
				min={$resolution.w * -1}
				max={$resolution.w}
				label="Pivote x"
				fixed={0}
			/>
		</div>
		<div
			on:mouseenter={() => showPivote(true)}
			on:mouseleave={() => showPivote(false)}
			role="button"
			tabindex={2}
		>
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
		<Anchor key="buffer" inputsStore={inputs} input />
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
