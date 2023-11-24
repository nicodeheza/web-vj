<script lang="ts">
	let files: FileList
	let video: HTMLVideoElement
	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D | null
	let convertedData: string
	let anchor: HTMLAnchorElement

	interface FrameData {
		width: number
		height: number
		timestamp: number
	}
	const framesMap = new Map<string, FrameData>()

	$: if (files && !ctx) {
		const src = URL.createObjectURL(files[0])
		ctx = canvas.getContext('2d')
		video.src = src

		video.play()
	}

	function onPlay(e: Event) {
		const video = e.target as HTMLVideoElement

		function step() {
			canvas.width = video.videoWidth
			canvas.height = video.videoHeight
			ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

			if (video.readyState > video.HAVE_CURRENT_DATA) {
				video.requestVideoFrameCallback((time, frame) => {
					const url = canvas.toDataURL('image/webp')
					if (!framesMap.has(url)) {
						framesMap.set(url, {
							width: frame.width,
							height: frame.height,
							timestamp: frame.expectedDisplayTime
						})
					}
				})
			}

			if (!video.ended) {
				requestAnimationFrame(step)
			}
		}
		requestAnimationFrame(step)
	}

	function onEnded() {
		const data: [FrameData, string][] = []
		framesMap.forEach((val, key) => {
			data.push([val, key])
		})

		convertedData = JSON.stringify(data)
		anchor.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(convertedData))
		anchor.setAttribute('download', `${files[0].name.split('.')[0]}.json`)
		anchor.click()
	}
</script>

<canvas bind:this={canvas} />
<!-- svelte-ignore a11y-media-has-caption -->
<video muted bind:this={video} on:play={onPlay} on:ended={onEnded} />
<input type="file" accept="video/*" bind:files />
<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={anchor} />

<style>
	video {
		display: none;
	}
	a {
		display: none;
	}
</style>
