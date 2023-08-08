<script lang="ts">
	import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
	import { nodeRecords } from 'store/nodes'
	import { Svelvet, Background } from 'svelvet'

	let w: number
	let h: number

	function onConnection(e: CustomEvent) {
		const sourceId = e.detail.sourceNode.id.split('N-')[1]
		const targetId = e.detail.targetNode.id.split('N-')[1]
		const record = $nodeRecords.get(sourceId)
		if (!record) return
		record.connections.push(targetId)
		$nodeRecords.set(sourceId, record)
		updateNodeRecordStorage($nodeRecords)
	}

	// <<<<save props sates and make run data transfers>>>>
	function onDisconnect(e: CustomEvent) {
		const sourceId = e.detail.sourceNode.id.split('N-')[1]
		const targetId = e.detail.targetNode.id.split('N-')[1]
		const record = $nodeRecords.get(sourceId)
		if (!record) return
		record.connections = record.connections.filter((id) => id != targetId)
		$nodeRecords.set(sourceId, record)
		updateNodeRecordStorage($nodeRecords)
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:clientWidth={w} bind:clientHeight={h}>
	<Svelvet
		id="nodeCanvas"
		width={w}
		height={h}
		minimap
		controls
		theme="dark"
		on:connection={(e) => onConnection(e)}
		on:disconnection={(e) => onDisconnect(e)}
	>
		<slot />
		<Background dotColor="transparent" bgColor="transparent" slot="background" />
	</Svelvet>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
	}
	:global(.svelvet-node) {
		background-color: rgba(131, 131, 131, 0.3) !important;
		backdrop-filter: blur(4px);
		padding: 0 !important;
	}

	:global(.node-title) {
		width: 100%;
		height: 34px;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px 10px 0 0;
	}

	:global(.node-title h1) {
		color: whitesmoke;
		font-size: 15px;
	}
</style>
