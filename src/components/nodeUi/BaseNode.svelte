<script lang="ts">
	import type { Position } from '$lib/fileSystem/types'
	import { Node } from 'svelvet'
	import { nodeRecords } from 'store/nodes'

	export let width: number | undefined = undefined
	export let height: number | undefined = undefined
	export let id: string
	export let position: Position
	export let connections: string[]

	$: if ($nodeRecords[id].position.x !== position.x || $nodeRecords[id].position.y !== position.y) {
		$nodeRecords[id].position = position
	}
</script>

<Node {width} {height} {id} {connections} bind:position let:disconnect useDefaults>
	<slot {disconnect} />
</Node>
