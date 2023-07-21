<script lang="ts">
	import { Svelvet, Minimap, Controls } from 'svelvet'
	import TestNode from './TestNode.svelte'
	import TestNodeData from './TestNodeData.svelte'

	let w: number
	let h: number
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<Svelvet id="my-canvas" width={w} height={h} TD minimap>
		<TestNode />
		<TestNodeData />
		<TestNodeData />
		<Controls />
	</Svelvet>
</div>

<style>
	div {
		width: 100%;
		height: 95vh;
		border: solid;
	}
</style>
