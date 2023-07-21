<script lang="ts">
	import { Node, Anchor, Slider, RadioGroup } from 'svelvet'
	import { generateInput, generateOutput } from 'svelvet'

	// Type your input structure
	type InputStructure = {
		value1: number
		value2: number
		option: string
	}

	// Create initial values for your parameters
	const initialData = {
		value1: 10,
		value2: 30,
		option: 'multiply'
	}

	// Generate a formatted inputs store
	const inputs = generateInput(initialData)

	// Specify processor function
	const processor = (inputs: InputStructure) => {
		if (inputs.option === 'add') {
			return inputs.value1 + inputs.value2
		} else if (inputs.option === 'subtract') {
			return inputs.value1 - inputs.value2
		} else if (inputs.option === 'multiply') {
			return inputs.value1 * inputs.value2
		} else {
			return inputs.value1 / inputs.value2
		}
	}

	// Generate output store
	const output = generateOutput(inputs, processor)
</script>

<Node width={400} height={200} useDefaults>
	<div class="node">
		<div class="radio-group">
			<RadioGroup
				options={['subtract', 'add', 'multiply', 'divide']}
				parameterStore={$inputs.option}
			/>
		</div>
		<div class="sliders">
			<Slider parameterStore={$inputs.value1} />
			<Slider parameterStore={$inputs.value2} />
		</div>
		<div class="input-anchors">
			{#each Object.entries($inputs) as [key, value] (key)}
				<Anchor {key} inputsStore={inputs} input bgColor="red" />
			{/each}
		</div>
		<div class="output-anchors">
			<Anchor outputStore={output} output />
		</div>
	</div>
</Node>
