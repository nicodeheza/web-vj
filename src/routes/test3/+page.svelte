<script lang="ts">
	import NodeCanvas from 'components/nodeUi/NodeCanvas.svelte'
	import TestNode from 'components/nodeUi/TestNode.svelte'
	import TestNodeData from 'components/nodeUi/TestNodeData.svelte'
</script>

<div class="nodesContainer">
	<NodeCanvas>
		<TestNode />
		<TestNodeData />
		<TestNodeData />
	</NodeCanvas>
</div>

<style>
	:global(html, body, root) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
	}
	.nodesContainer {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
