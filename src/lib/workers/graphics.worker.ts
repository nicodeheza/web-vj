import { Application, type ICanvas } from '@pixi/webworker'
import { imageTextureHandlers } from './messageHandlers/imageTexturesHandlers'
import type { Action } from './types'
import { imageSpriteHandlers } from './messageHandlers/imageSpriteHandlers'
import { getOutputHandlers } from './messageHandlers/outputHandlers'
import { videoTextureHandlers } from './messageHandlers/videoTextureHandelrs'
import { videoSpriteHandles } from './messageHandlers/videoSpriteHandlers'

let app: Application<ICanvas>

self.onmessage = async (event) => {
	if (event.data.options) {
		const { options } = event.data
		app = new Application(options)
	}
	if (event.data.imageTexture) {
		const { action, payload } = event.data.imageTexture as Action
		imageTextureHandlers[action](payload)
	}
	if (event.data.imageElement) {
		const { action, payload } = event.data.imageElement as Action
		imageSpriteHandlers[action](payload)
	}
	if (event.data.videoTexture) {
		const { action, payload } = event.data.videoTexture as Action
		videoTextureHandlers[action](payload)
	}
	if (event.data.videoElement) {
		const { action, payload } = event.data.videoElement as Action
		videoSpriteHandles[action](payload)
	}
	if (event.data.output) {
		const { action, payload } = event.data.output as Action
		const outputHandlers = getOutputHandlers(app.stage)
		outputHandlers[action](payload)
	}
}
