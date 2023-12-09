<script lang="ts">
	import { Anchor } from 'svelvet'
	import type { Invalidator, Subscriber, Unsubscriber } from 'svelte/store'
	import type { Position } from '$lib/fileSystem/types'
	import BaseNode from '../BaseNode.svelte'

	interface OutputStore {
		subscribe: (
			this: void,
			run: Subscriber<string | number | boolean | object>,
			invalidate?: Invalidator<string | number | boolean | object> | undefined
		) => Unsubscriber
		unsubscribe: () => void
		set: null
		update: null
	}

	export let name: string
	export let textVal: string
	export let outputStore: OutputStore
	export let position: Position
	export let connections: string[]
	export let id: string
	export let width = 200
	export let height = 100
</script>

<BaseNode {width} {height} {id} {connections} type="imageTexture" label={name} bind:position>
	<div class="buffer-input-container">
		<input type="text" bind:value={textVal} />
	</div>
	<div class="output-container">
		<Anchor {outputStore} output />
	</div>
	<slot />
</BaseNode>

<style>
	.buffer-input-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;

		text-align: center;
	}
	.buffer-input-container input {
		margin-top: 53px;
	}
	.output-container {
		position: absolute;
		right: -6px;
		bottom: 30px;
		z-index: 10000000;
	}
</style>
