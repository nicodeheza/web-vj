<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let linked: boolean
	export let hovering: boolean
	export let connecting: boolean

	const dispatch = createEventDispatcher<Record<'connecting', boolean>>()

	$: if (hovering || connecting) {
		dispatch('connecting', true)
	} else {
		setTimeout(() => dispatch('connecting', false), 100)
	}
</script>

<div />

<style>
	div {
		width: 15px;
		height: 15px;
		background-color: greenyellow;
		border-radius: 50%;
	}
</style>
