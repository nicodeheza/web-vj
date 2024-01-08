import { Texture } from '@pixi/webworker'
import type { Frame, PixiFrame } from './types'
import { VideoSpriteStore } from '.'

class VideoTextureStore {
	private textures: Map<string, PixiFrame[]> = new Map()
	private subscriptions: Map<string, Set<string>> = new Map()

	async crateOrUpdate(url: string, id: string) {
		if (this.textures.has(id)) {
			this.delete(id)
		}
		this.textures.set(id, [
			{
				texture: Texture.EMPTY,
				time: 0
			}
		])
		this.updateSubscribers(id)
		const frames = await fetch(url).then<Frame[]>((data) => data.json())
		const pixiFrames: PixiFrame[] = frames.map(({ image, time }) => ({
			texture: Texture.from(image),
			time
		}))

		this.textures.set(id, pixiFrames)
		this.updateSubscribers(id)
	}

	get(id: string) {
		return this.textures.get(id)
	}

	delete(id: string) {
		const frames = this.textures.get(id)
		if (!frames) return
		frames.forEach((frame) => {
			frame.texture.destroy()
		})
		this.textures.delete(id)
		this.subscriptions.delete(id)
	}

	subscribe(id: string, spriteId: string) {
		if (!this.textures.has(id)) return
		if (this.subscriptions.has(id)) {
			this.subscriptions.get(id)?.add(spriteId)
		} else {
			this.subscriptions.set(id, new Set([spriteId]))
		}
	}

	unsubscribe(id: string, spriteId: string) {
		if (!this.subscriptions.has(id)) return
		this.subscriptions.get(id)?.delete(spriteId)
	}

	private updateSubscribers(id: string) {
		if (!this.subscriptions.has(id)) return
		this.subscriptions.get(id)?.forEach((subId) => {
			VideoSpriteStore.replaceTexture(subId, this.textures.get(id) || [])
		})
	}
}

export const videoTextureStore = new VideoTextureStore()
