<script lang="ts">
	import { Svelvet, Controls, Background } from 'svelvet'

	let w: number
	let h: number
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<Svelvet id="my-canvas" width={w} height={h} TD>
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
	:global(.svelvet-node) {
		background-color: rgba(119, 119, 119, 0.35) !important;
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
