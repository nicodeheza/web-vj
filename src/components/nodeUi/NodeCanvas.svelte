<script lang="ts">
	import { setContext } from 'svelte'
	import { Svelvet, Controls, Background } from 'svelvet'

	let w: number
	let h: number

	let svelvet: Svelvet

	setContext('disconnect', {
		disconnect: (
			source: [string | number, string | number],
			target: [string | number, string | number]
		) => svelvet.disconnect(source, target)
	})
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<Svelvet bind:this={svelvet} id="my-canvas" width={w} height={h} TD>
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
