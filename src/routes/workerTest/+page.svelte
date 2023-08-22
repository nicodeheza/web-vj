<script lang="ts">
	import { onMount } from 'svelte'

	let worker: Worker

	onMount(async () => {
		const Worker = await import('$lib/workers/p5.worker?worker')

		worker = new Worker.default()

		worker.addEventListener('message', (msg) => {
			console.log(msg)
		})
	})
</script>

<h1>Test worker</h1>
