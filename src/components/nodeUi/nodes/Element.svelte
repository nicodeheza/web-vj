<script lang="ts">
	import type { Position, ElementProps } from '$lib/fileSystem/types'
	import { resolution } from 'store/p5'
	import { Anchor, generateInput, generateOutput } from 'svelvet'
	import BaseNode from './BaseNode.svelte'
	import {
		crateImageElementOrReplaceTexture,
		imageElementRotate,
		imageElementScale,
		imageElementSetPivot,
		imageElementTranslate
	} from '$lib/workerActions/imageElementActions'
	import { onMount } from 'svelte'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ElementProps

	let _scale: number
	let _x: number
	let _y: number
	let _rotation: number
	let _pivotX: number
	let _pivotY: number

	onMount(() => {
		const { scale, x, y, rotation, pivotX, pivotY } = props
		imageElementScale([scale, scale], id)
		imageElementTranslate([x, y], id)
		imageElementRotate(rotation, id)
		imageElementSetPivot([pivotX, pivotY], id)
		_scale = scale
		_x = x
		_y = y
		_rotation = rotation
		_pivotX = pivotX
		_pivotY = pivotY
	})

	$: imageElementScale([_scale, _scale], id)
	$: imageElementTranslate([_x, _y], id)
	$: imageElementRotate(_rotation, id)
	$: imageElementSetPivot([_pivotX, _pivotY], id)

	let texture = { id: '', version: 0 }

	interface Inputs {
		parent: { id: string; type: string; version: number }
	}

	const initialData = {
		parent: { id: '', type: '', version: 0 }
	}

	const inputs = generateInput(initialData)
	//TODO - update storage
	const processor = (inputs: Inputs) => {
		const parent = inputs.parent
		if (
			parent.type === 'imageTexture' &&
			(texture.id !== parent.id || parent.version !== texture.version)
		) {
			crateImageElementOrReplaceTexture(parent.id, id)
			texture.id = parent.id
			texture.version = parent.version
		}

		return { id, type: 'imageElement' }
	}

	const output = generateOutput(inputs, processor)
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
		<div>
			<label for="xpos">X Pos</label>
			<input
				id="xpos"
				bind:value={_x}
				type="number"
				min={$resolution.w * -2}
				max={$resolution.w * 2}
			/>
		</div>
		<div>
			<label for="ypos">Y Pos</label>
			<input
				id="ypos"
				type="number"
				bind:value={_y}
				min={$resolution.h * -2}
				max={$resolution.h * 2}
			/>
		</div>
		<div>
			<label for="rotation">Rotation</label>
			<input id="rotation" type="number" bind:value={_rotation} min={-360} max={360} />
		</div>
		<div>
			<label for="scale">Scale</label>
			<input id="scale" type="number" bind:value={_scale} min={0} max={10} />
		</div>
		<div role="button" tabindex={1}>
			<label for="xpivot">X Pivot</label>
			<input
				id="xpivot"
				type="number"
				bind:value={_pivotX}
				min={$resolution.w * -1}
				max={$resolution.w}
			/>
		</div>
		<div role="button" tabindex={2}>
			<label for="ypivot">Y Pivot</label>
			<input
				id="ypivot"
				type="number"
				bind:value={_pivotY}
				min={$resolution.h * -1}
				max={$resolution.h}
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
