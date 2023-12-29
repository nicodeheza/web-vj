<script lang="ts">
	import type { ElementProps, Position } from '$lib/fileSystem/types'
	import {
		crateImageElementOrReplaceTexture,
		imageElementRemoveTexture,
		imageElementRotate,
		imageElementScale,
		imageElementSetPivot,
		imageElementTranslate
	} from '$lib/workerActions/imageElementActions'
	import { deleteImageTexture } from '$lib/workerActions/imageTextureActions'
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
	type="imageElement"
	scale={imageElementScale}
	translate={imageElementTranslate}
	rotate={imageElementRotate}
	setPivot={imageElementSetPivot}
	crateODeleteTexture={crateImageElementOrReplaceTexture}
	deleteElement={deleteImageTexture}
	removeTexture={imageElementRemoveTexture}
/>
