<script lang="ts">
	import { onMount } from 'svelte'

	interface HTMLVideoElementWithCaptureStream extends HTMLVideoElement {
		captureStream(): MediaStream
	}

	let worker: Worker
	let canvas: HTMLCanvasElement
	let video: HTMLVideoElement
	let imageCapture: ImageCapture

	let count = 0

	onMount(async () => {
		const Worker = await import('$lib/workers/pixi.worker?worker')

		worker = new Worker.default()

		canvas.style.width = '600px'
		canvas.style.height = '600px'
		const view = canvas.transferControlToOffscreen()

		worker.postMessage(
			{
				options: {
					width: 600,
					height: 600,
					resolution: window.devicePixelRatio,
					view,
					background: '0x1099bb'
				}
			},
			[view]
		)
	})

	const sendVideo = async () => {
		if (
			!imageCapture ||
			!imageCapture.track.enabled ||
			imageCapture.track.readyState !== 'live' ||
			imageCapture.track.muted
		)
			return
		try {
			const videoBitmap = await imageCapture.grabFrame()

			worker.postMessage({ videoBitmap }, [videoBitmap])

			requestAnimationFrame(sendVideo)
		} catch (error) {
			console.error(error)
		}
	}

	const onPlay = () => {
		const stream = (video as HTMLVideoElementWithCaptureStream).captureStream()
		const [track] = stream.getVideoTracks()
		imageCapture = new ImageCapture(track)
		requestAnimationFrame(sendVideo)
	}
</script>

<canvas bind:this={canvas} />
<!-- svelte-ignore a11y-media-has-caption -->
<video src="/vid/test2.mp4" autoplay muted loop bind:this={video} on:play={onPlay} />

<button on:click={() => setInterval(() => (count += 1), 1)}>press</button>
<h1>{count}</h1>

<style>
	video {
		opacity: 0;
		width: 0;
		height: 0;
	}
</style>
