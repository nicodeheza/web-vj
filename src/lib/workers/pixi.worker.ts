import { Application, Sprite, Texture, type ICanvas } from '@pixi/webworker'

let app: Application<ICanvas>
let vidS: Sprite
self.onmessage = async (event) => {
	if (event.data.options) {
		const { options } = event.data
		app = new Application(options)

		const texture = Texture.from('/img/test.jpg')
		const sprite = new Sprite(texture)
		sprite.anchor.set(0.5)
		sprite.x = app.screen.width / 2
		sprite.y = app.screen.height / 2
		sprite.scale.set(0.5)
		sprite.angle = 45

		app.stage.addChild(sprite)
	} else if (event.data.frameSource && app) {
		const { frameSource } = event.data as { frameSource: ReadableStream<VideoFrame> }
		const reader = frameSource.getReader()
		const result = await reader.read()
		const frame = result.value
		if (frame) {
			console.log('run')
			const vidT = await getVideoTexture(frame)

			vidS = new Sprite(vidT)

			vidS.anchor.set(0.5)
			vidS.x = app.screen.width / 2 - 100
			vidS.y = app.screen.height / 2 - 50
			vidS.scale.set(1)
			vidS.angle = -45

			app.stage.addChild(vidS)

			// app.ticker.add(async () => {
			// 	vidS.texture = await getVideoTexture(frame)
			// })
		}

		// const video = event.data.videoBitmap

		// if (!vidS) {
		// 	const vidT = Texture.from(video)
		// 	vidS = new Sprite(vidT)

		// 	vidS.anchor.set(0.5)
		// 	vidS.x = app.screen.width / 2 - 100
		// 	vidS.y = app.screen.height / 2 - 50
		// 	vidS.scale.set(1)
		// 	vidS.angle = -45

		// 	app.stage.addChild(vidS)
		// } else {
		// 	vidS.texture = Texture.from(video)
		// }
	}
}

async function getVideoTexture(frame: VideoFrame) {
	console.log('run')
	const buffer = new Float32Array(frame.allocationSize())
	await frame.copyTo(buffer)
	console.log(buffer.length)
	// frame.close()
	// const blob = new Blob([buffer], { type: 'image/png' })
	// const imgUrl = URL.createObjectURL(blob)

	const texture = Texture.fromBuffer(buffer, frame.codedWidth, frame.codedHeight)
	frame.close()
	return texture
}
