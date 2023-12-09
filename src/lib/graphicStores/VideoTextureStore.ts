import { Texture } from '@pixi/webworker'
import type { Frame, PixiFrame } from './types'

class VideoTextureStore {
	private textures: Map<string, PixiFrame[] | 'loading'> = new Map()

	async load(url: string, id: string) {
		if (this.textures.has(id)) return
		this.textures.set(id, 'loading')
		const frames = await fetch(url).then<Frame[]>((data) => data.json())
		const pixiFrames: PixiFrame[] = frames.map(({ image, time }) => ({
			texture: Texture.from(image),
			time
		}))

		this.textures.set(id, pixiFrames)
	}

	get(id: string) {
		return this.textures.get(id)
	}

	delete(id: string) {
		const frames = this.textures.get(id)
		if (!frames || frames === 'loading') return
		frames.forEach((frame) => {
			frame.texture.destroy()
		})
		this.textures.delete(id)
	}

	async update(url: string, id: string) {
		if (!this.textures.has(id)) return
		this.delete(id)
		await this.load(url, id)
	}
}

export const videoTextureStore = new VideoTextureStore()
