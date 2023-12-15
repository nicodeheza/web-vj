<script lang="ts">
	import type { Position } from '$lib/fileSystem/types'
	import { Node } from 'svelvet'
	import { disconnection, nodeRecords, type Disconnection } from 'store/nodes'
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
	import { onMount } from 'svelte'

	export let width: number | undefined = undefined
	export let height: number | undefined = undefined
	export let id: string
	export let position: Position
	export let connections: string[]
	export let label: string
	export let type: string
	export let onDelete: () => void = () => {}
	export let onDisconnect: (disconnect: Disconnection) => void = () => {}
	let drop: undefined | 'center' | 'cursor'

	onMount(() => {
		const { x, y } = position

		if (!x && !y) {
			drop = 'center'
		}
	})

	const element = $nodeRecords.get(id)!
	$: if (element.position.x !== position.x || element.position.y !== position.y) {
		element.position = position
		$nodeRecords.set(id, element)
		updateNodeRecordStorage($nodeRecords)
	}
	$: if ($disconnection.target === id) onDisconnect($disconnection)
</script>

<!-- TODO - remove disconnect? -->
<Node {width} {height} {id} bind:connections bind:position let:disconnect {drop} useDefaults>
	<div class="node">
		<div class={`node-title name ${type}-color`}>
			<h1>{label}</h1>
			{#if type != 'output'}
				<button on:click={onDelete}>x</button>
			{/if}
		</div>
		<slot {disconnect} />
	</div>
</Node>

<style>
	.node {
		padding: 0px 15px;
		margin-bottom: 20px;
	}
	.node-title {
		display: flex;
		align-items: center;
	}
	.node-title button {
		position: absolute;
		right: 5px;
		background-color: transparent;
		border: none;
		color: white;
		font-size: 15px;
		font-weight: bolder;
		cursor: pointer;
		z-index: 1;
	}
	.bufferRenderer-color {
		background-color: var(--buffer-renderer-color);
	}
	.imageTexture-color {
		background-color: var(--image-buffer-color);
	}
	.element-color {
		background-color: var(--element-color);
	}
	.composition-color {
		background-color: var(--composition-color);
	}
	.output-color {
		background-color: var(--output-color);
	}
</style>
