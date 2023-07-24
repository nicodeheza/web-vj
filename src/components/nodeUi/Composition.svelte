<script lang="ts">
	import Composition from '$lib/appComponents/Composition'
	import type { CompositionI, TransformationsI } from '$lib/appComponents/types'
	import { Anchor, Node, generateInput, generateOutput } from 'svelvet'

	let instance: CompositionI
	let displayNames: string[] = []

	interface InputStructure {
		element: TransformationsI | boolean
	}

	const initialData = {
		element: false
	}

	const inputs = generateInput(initialData)

	const processor = (inputs: InputStructure) => {
		if (!instance && inputs.element) instance = new Composition()
		if (instance) {
			instance.add(inputs.element as TransformationsI)
			displayNames.push((inputs.element as TransformationsI).name)
			displayNames = displayNames
		}
		return instance
	}

	const output = generateOutput(inputs, processor)

	// add disconnect
</script>

<Node width={250} height={300} useDefaults>
	<div class="node">
		<div class="node-title name">
			<h1>Composition</h1>
		</div>
		<div class="elements">
			{#if instance}
				<ul>
					{#each displayNames as name}
						<li>{name}</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="input-anchor">
			<Anchor key="element" inputsStore={inputs} input multiple />
		</div>
		<div class="output-anchor">
			<Anchor outputStore={output} output />
		</div>
	</div>
</Node>
