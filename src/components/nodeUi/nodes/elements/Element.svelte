<script lang="ts">
	import type { Position, ElementProps } from '$lib/fileSystem/types'
	import { resolution } from 'store/p5'
	import { Anchor, generateInput, generateOutput } from 'svelvet'
	import BaseNode from '../BaseNode.svelte'
	import type { Disconnection } from 'store/nodes'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ElementProps

	export let type: 'imageElement' | 'videoElement'

	export let scale: (scale: [number, number], id: string) => void
	export let translate: (scale: [number, number], id: string) => void
	export let rotate: (rotation: number, id: string) => void
	export let setPivot: (scale: [number, number], id: string) => void
	export let crateODeleteTexture: (textureId: string, id: string) => void
	export let deleteElement: (id: string) => void
	export let removeTexture: (id: string) => void
	export let play: (id: string) => void = () => {}
	export let stop: (id: string) => void = () => {}

	const titles = {
		imageElement: 'Image Element',
		videoElement: 'Video Element'
	}

	let _scale: number
	let _x: number
	let _y: number
	let _rotation: number
	let _pivotX: number
	let _pivotY: number
	let _isPlaying: boolean | undefined

	let texture = { id: '', version: 0 }

	function setUp() {
		const { scale, x, y, rotation, pivotX, pivotY, isPlaying } = props
		_scale = scale
		_x = x
		_y = y
		_rotation = rotation
		_pivotX = pivotX
		_pivotY = pivotY
		_isPlaying = isPlaying
	}

	$: if (texture.id && _scale === undefined) setUp()
	$: if (_scale) scale([_scale, _scale], id)
	$: if (_x !== undefined && _y !== undefined) translate([_x, _y], id)
	$: if (_rotation !== undefined) rotate(_rotation, id)
	$: if (_pivotX !== undefined && _pivotY !== undefined) setPivot([_pivotX, _pivotY], id)
	$: if (_isPlaying !== undefined) {
		if (_isPlaying) {
			play(id)
		} else {
			stop(id)
		}
	}

	interface Inputs {
		parent: { id: string; type: string; version: number }
	}

	const initialData = {
		parent: { id: '', type: '', version: 0 }
	}

	const inputs = generateInput(initialData)
	const processor = (inputs: Inputs) => {
		const parent = inputs.parent
		if (
			(parent.type === 'imageTexture' || parent.type === 'videoTexture') &&
			(texture.id !== parent.id || parent.version !== texture.version)
		) {
			crateODeleteTexture(parent.id, id)
			texture.id = parent.id
			texture.version = parent.version
		}

		return { id, type }
	}

	const output = generateOutput(inputs, processor)

	function onDelete() {
		deleteElement(id)
	}

	function onDisconnect(disconnection: Disconnection) {
		removeTexture(disconnection.target)
		texture = { id: '', version: 0 }
	}
</script>

<BaseNode
	{onDelete}
	{onDisconnect}
	width={250}
	height={270}
	{id}
	{connections}
	{position}
	type="element"
	label={titles[type]}
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
		{#if type === 'videoElement'}
			<div>
				<button
					on:click={() => {
						_isPlaying = true
					}}>play</button
				>
				<button
					on:click={() => {
						_isPlaying = false
					}}>stop</button
				>
			</div>
		{/if}
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
