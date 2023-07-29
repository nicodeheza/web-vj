<script lang="ts">
	import Composition from '$lib/appComponents/Composition'
	import type { CompositionI, TransformationsI } from '$lib/appComponents/types'
	import { Anchor, Node, generateInput, generateOutput } from 'svelvet'
	import CustomAnchor from '../CustomAnchor.svelte'
	import Items from './Items.svelte'

	let instance: CompositionI
	let isConnecting: boolean
	interface InputStructure {
		element: TransformationsI[]
	}

	const initialData = {
		element: []
	}

	let inputs = generateInput(initialData)

	const processor = (inputs: InputStructure) => {
		if (!instance && inputs.element[0]) instance = new Composition()
		if (instance && inputs.element[0]) {
			if (!instance.ids[inputs.element[0].id] && isConnecting) {
				instance.add(inputs.element[0])
			}

			instance = instance
		}
		return instance
	}

	const output = generateOutput(inputs, processor)

	function remove(id: string) {
		instance.delete(id)
		instance = instance
	}

	function moveUp(id: string) {
		instance.moveBack(id)
		instance = instance
	}
	function moveDown(id: string) {
		instance.moveFront(id)
		instance = instance
	}
</script>

<Node useDefaults let:disconnect>
	<div class="node">
		<div class="node-title name">
			<h1>Composition</h1>
		</div>
		<div class="elements">
			{#if instance}
				<ul>
					{#each instance.transformations as transformation}
						<Items
							name={transformation.name}
							id={transformation.id}
							disconnect={(id) => {
								disconnect(id)
								remove(id)
							}}
							{moveUp}
							{moveDown}
						/>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="input-anchor">
			<Anchor
				key="element"
				inputsStore={inputs}
				let:connecting
				let:linked
				let:hovering
				input
				multiple
			>
				<CustomAnchor
					{connecting}
					{linked}
					{hovering}
					on:connecting={(e) => (isConnecting = e.detail)}
				/>
			</Anchor>
		</div>
		<div class="output-anchor">
			<Anchor outputStore={output} output />
		</div>
	</div>
</Node>

<style>
	.name {
		background-color: rgb(0, 112, 209);
	}

	.input-anchor {
		position: absolute;
		left: -7px;
		top: calc(50% + 4px);
	}

	.output-anchor {
		position: absolute;
		right: -7px;
		top: calc(50% + 4px);
	}

	.node {
		padding: 20px;
		min-width: 200px;
		min-height: 60px;
	}

	.elements {
		margin-top: 35px;
	}

	.elements ul {
		margin: 0;
		padding: 0px;
		width: 200px;
	}
</style>
