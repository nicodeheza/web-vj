<script lang="ts">
	import type ReteEditor from '$lib/rete/editor'
	import { createTestNode } from '$lib/rete/nodes/TestNode'
	import { onMount } from 'svelte'
	let el: HTMLDivElement
	let reteEditor: ReteEditor
	let count = 0

	onMount(async () => {
		const { default: ReteEditor } = await import('../../lib/rete/editor')
		if (reteEditor) return
		reteEditor = new ReteEditor(el)
	})

	async function addNode() {
		await createTestNode(String(count), reteEditor)
		count++
	}
</script>

<div class="rete" bind:this={el} />
<button on:click={addNode}>add node</button>

<style>
	.rete {
		position: relative;
		width: 95vw;
		height: 94vh;
		font-size: 1rem;
		text-align: left;
		border: 1px solid #cbd0db;
	}
</style>
