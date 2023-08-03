<script lang="ts">
	import type { Position } from '$lib/fileSystem/types'
	import { Node } from 'svelvet'
	import { nodeRecords } from 'store/nodes'

	export let width: number | undefined = undefined
	export let height: number | undefined = undefined
	export let id: string
	export let position: Position
	export let connections: string[]

	function deleteNode() {
		$nodeRecords.delete(id)
		$nodeRecords = $nodeRecords
	}

	const element = $nodeRecords.get(id)!
	$: if (element.position.x !== position.x || element.position.y !== position.y) {
		element.position = position
		$nodeRecords.set(id, element)
	}
</script>

<Node {width} {height} {id} {connections} bind:position let:disconnect drop={'center'} useDefaults>
	<slot {disconnect} {deleteNode} />
</Node>
