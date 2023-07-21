<script lang="ts">
	import { Node, Anchor } from 'svelvet'
	import type { Connections } from 'svelvet'
	import CustomAnchor from './Anchor.svelte' // A Svelte component or HTML element of your creation
	const connections: Connections = [
		['node1', '4'],
		['node2', '3']
	]
</script>

<Node let:selected bgColor="gray" borderRadius={15}>
	<div class:selected class="node">
		<div class="input-anchors">
			<Anchor bgColor="red" id="data-connection" input />
			<Anchor multiple input nodeConnect />
		</div>
		<div class="output-anchors">
			<Anchor let:linked let:hovering let:connecting output>
				<CustomAnchor {linked} {hovering} {connecting} />
			</Anchor>
			<Anchor direction="east" {connections} output />
		</div>
	</div>
</Node>

<style>
	.node {
		width: 200px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.input-anchors {
		align-self: flex-start;
		margin-left: -5px;
	}
	.output-anchors {
		align-self: flex-end;
		margin-right: -10px;
	}
</style>
