import { AnimatedSprite } from '@pixi/webworker'
import type { PixiFrame } from './types'

class VideoSpriteStore {
	private sprites: Map<string, AnimatedSprite> = new Map()

	create(id: string, videoTexture: PixiFrame[]) {
		if (this.sprites.has(id)) return
		this.sprites.set(id, new AnimatedSprite(videoTexture))
	}

	replaceTexture(id: string, videoTexture: PixiFrame[]) {
		const animatedSprite = this.sprites.get(id)
		if (!animatedSprite) return
		animatedSprite.textures = videoTexture
	}

	get(id: string) {
		this.sprites.get(id)
	}

	delete(id: string) {
		const sprite = this.sprites.get(id)
		if (!sprite) return
		sprite.destroy()
		this.sprites.delete(id)
	}
}

export const videoSpriteStore = new VideoSpriteStore()
