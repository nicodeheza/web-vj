<script lang="ts">
	import { Svelvet, Minimap, Controls, Background } from 'svelvet'

	let w: number
	let h: number
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<Svelvet id="my-canvas" width={w} height={h} TD minimap>
		<slot />
		<Controls />
		<Background dotColor="transparent" bgColor="transparent" slot="background" />
	</Svelvet>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
