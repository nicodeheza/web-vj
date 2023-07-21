<script lang="ts">
	import { Anchor, Node, generateInput, generateOutput } from 'svelvet'
	import ImageBuffer from '$lib/appComponents/ImageBuffer'
	import { globalP5 } from 'store/p5'

	let instance: ImageBuffer
	let textVal = 'img/test.jpg'

	interface Input {
		uri: string
	}

	const initialData = {
		uri: 'img/test.jpg'
	}

	const input = generateInput(initialData)

	const processor = (input: Input) => {
		if (instance) {
			instance.uri = input.uri
		} else {
			instance = new ImageBuffer(input.uri, $globalP5)
		}
		return instance
	}

	let act = true
	$: if (textVal) {
		new Promise((r) => {
			act = false
			setTimeout(r, 2000)
		}).then(() => {
			act = true
		})
	}
	$: if ($input.uri.set && act) {
		$input.uri.set(textVal)
	}

	const output = generateOutput(input, processor)
</script>

<Node width={200} height={100} bgColor="#016191">
	<div class="node">
		<div class="input">
			<input type="text" bind:value={textVal} />
		</div>
		<div class="output">
			<Anchor outputStore={output} output />
		</div>
	</div>
</Node>
