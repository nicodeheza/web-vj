import { AnimatedSprite, Texture } from '@pixi/webworker'
import type { PixiFrame } from './types'
import { cratePivot } from './helpers'
import { VideoTextureStore } from '.'

class VideoSpriteStore {
	private sprites: Map<string, AnimatedSprite> = new Map()
	private subscriptions: Record<string, string> = {}

	private create(id: string, textureId: string) {
		if (this.sprites.has(id)) return
		const texture = VideoTextureStore.get(textureId)
		if (!texture) throw 'texture not exist'
		const sprite = new AnimatedSprite(
			texture || [
				{
					time: 0,
					texture: Texture.EMPTY
				}
			]
		)
		const pivot = cratePivot()
		sprite.addChild(pivot)
		this.sprites.set(id, sprite)

		VideoTextureStore.subscribe(textureId, id)
		this.subscriptions[id] = textureId
	}

	replaceTexture(id: string, videoTexture: PixiFrame[]) {
		const animatedSprite = this.sprites.get(id)
		if (!animatedSprite) return
		animatedSprite.textures = videoTexture
		animatedSprite.play()
	}

	createOrReplaceTexture(id: string, textureId: string) {
		if (this.sprites.has(id)) {
			const texture = VideoTextureStore.get(textureId)
			if (!texture) throw 'texture do not exist'
			const oldSub = this.subscriptions[id]
			VideoTextureStore.unsubscribe(oldSub, id)
			this.replaceTexture(id, texture)
			VideoTextureStore.subscribe(textureId, id)
			this.subscriptions[id] = textureId
		} else {
			this.create(id, textureId)
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
		this.removeSubscription(id)
	}

	removeSubscription(id: string) {
		const sub = this.subscriptions[id]
		VideoTextureStore.unsubscribe(sub, id)
		delete this.subscriptions[id]
	}

	removeTexture(id: string) {
		const sprite = this.sprites.get(id)
		if (!sprite) return
		sprite.texture = Texture.EMPTY
		this.removeSubscription(id)
	}
}

export const videoSpriteStore = new VideoSpriteStore()
