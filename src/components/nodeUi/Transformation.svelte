<script lang="ts">
	import Transformations from '$lib/appComponents/Transformation'
	import type { BufferI } from '$lib/appComponents/types'
	import { resolution } from 'store/p5'
	import { Anchor, Node, Slider, generateInput, generateOutput } from 'svelvet'
	import { v4 as uuidv4 } from 'uuid'

	let instance: Transformations
	let name: string
	let id = uuidv4()

	interface Inputs {
		x: number
		y: number
		rotation: number
		scale: number
		pivoteX: number
		pivoteY: number
		buffer: BufferI | boolean
		name: string
	}

	const initialData = {
		x: 0,
		y: 0,
		rotation: 0,
		scale: 1,
		pivoteX: 0,
		pivoteY: 0,
		buffer: false,
		name: ''
	}

	const inputs = generateInput(initialData)

	const processor = (inputs: Inputs) => {
		if (instance) {
			instance.x = inputs.x
			instance.y = inputs.y
			instance.rotation = inputs.rotation
			instance.scale = inputs.scale
			instance.pivotX = inputs.pivoteX
			instance.pivotY = inputs.pivoteY
			instance.name = inputs.name
			instance.buffer = inputs.buffer as BufferI
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

	$: if ($inputs.name.set) {
		$inputs.name.set(name)
	}
</script>

<Node width={250} height={270} {id} useDefaults>
	<div class="node">
		<div class="node-title name">
			<h1>Screen Element</h1>
		</div>
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
			<Slider
				parameterStore={$inputs.pivoteX}
				min={0}
				max={$resolution.w}
				label="Pivote x"
				fixed={0}
			/>
			<Slider
				parameterStore={$inputs.pivoteY}
				min={0}
				max={$resolution.h}
				label="Pivote y"
				fixed={0}
			/>
		</div>
		<div class="input-anchor">
			<Anchor key="buffer" inputsStore={inputs} input />
		</div>
		<div class="output-anchor">
			<Anchor outputStore={output} output />
		</div>
	</div>
</Node>

<style>
	.node {
		padding: 0px 15px;
		margin-bottom: 20px;
	}
	.name {
		background-color: rgb(1, 128, 128);
	}
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
