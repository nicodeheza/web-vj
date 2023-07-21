<script lang="ts">
	import { Anchor, Node } from 'svelvet'
	import type { Invalidator, Subscriber, Unsubscriber } from 'svelte/store'

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
</script>

<Node width={200} height={100} useDefaults>
	<div class="node">
		<div class="node-title image-buffer-title">
			<h1>{name}</h1>
		</div>
		<div class="buffer-input-container">
			<input type="text" bind:value={textVal} />
		</div>
		<div class="output-container">
			<Anchor {outputStore} output />
		</div>
	</div>
</Node>

<style>
	.image-buffer-title {
		background-color: rgb(139, 0, 70);
	}

	.buffer-input-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.buffer-input-container input {
		margin-top: 30px;
	}
	.output-container {
		position: absolute;
		right: -6px;
		bottom: 30px;
		z-index: 10000000;
	}
</style>
