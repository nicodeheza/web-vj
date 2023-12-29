import { AnimatedSprite, Texture } from '@pixi/webworker'
import type { PixiFrame } from './types'
import { cratePivot } from './helpers'

class VideoSpriteStore {
	private sprites: Map<string, AnimatedSprite> = new Map()

	private create(id: string, videoTexture: PixiFrame[]) {
		if (this.sprites.has(id)) return
		const sprite = new AnimatedSprite(videoTexture)
		const pivot = cratePivot()

		sprite.addChild(pivot)
		this.sprites.set(id, sprite)
	}

	private replaceTexture(id: string, videoTexture: PixiFrame[]) {
		const animatedSprite = this.sprites.get(id)
		if (!animatedSprite) return
		animatedSprite.textures = videoTexture
	}

	createOrReplaceTexture(id: string, videoTexture: PixiFrame[]) {
		if (this.sprites.has(id)) {
			this.replaceTexture(id, videoTexture)
		} else {
			this.create(id, videoTexture)
		}
	}

	get(id: string) {
		return this.sprites.get(id)
	}

	delete(id: string) {
		const sprite = this.sprites.get(id)
		if (!sprite) return
		sprite.destroy()
		this.sprites.delete(id)
	}

	removeTexture(id: string) {
		const sprite = this.sprites.get(id)
		if (!sprite) return
		sprite.texture = Texture.EMPTY
	}
}

export const videoSpriteStore = new VideoSpriteStore()
