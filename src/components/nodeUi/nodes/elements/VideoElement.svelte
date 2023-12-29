<script lang="ts">
	import type { ElementProps, Position } from '$lib/fileSystem/types'
	import {
		crateVideoElementOrReplaceTexture,
		videoElementDelete,
		videoElementRemoveTexture,
		videoElementRotate,
		videoElementScale,
		videoElementSetPivot,
		videoElementTranslate,
		play,
		stop
	} from '$lib/workerActions/videoElementActions'
	import Element from './Element.svelte'

	export let id: string
	export let connections: string[]
	export let position: Position
	export let props: ElementProps
</script>

<Element
	{id}
	{connections}
	{position}
	{props}
	type="videoElement"
	scale={videoElementScale}
	translate={videoElementTranslate}
	rotate={videoElementRotate}
	setPivot={videoElementSetPivot}
	crateODeleteTexture={crateVideoElementOrReplaceTexture}
	deleteElement={videoElementDelete}
	removeTexture={videoElementRemoveTexture}
	{play}
	{stop}
/>
