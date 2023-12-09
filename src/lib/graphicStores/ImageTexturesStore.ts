import { Texture } from '@pixi/webworker'

class ImageTexturesStore {
	private textures: Map<string, Texture> = new Map()

	crateOrUpdate(url: string, id: string) {
		if (this.textures.has(id)) {
			const texture = this.get(id)
			texture?.destroy()
		}
		const newTexture = Texture.from(url)
		this.textures.set(id, newTexture)
	}

	get(id: string) {
		return this.textures.get(id)
	}

	update(url: string, id: string) {
		const texture = this.get(id)
		texture?.destroy()
		const newTexture = Texture.from(url)
		this.textures.set(id, newTexture)
	}

	delete(id: string) {
		const texture = this.get(id)
		texture?.destroy()
		this.textures.delete(id)
	}
}

export const imageTexturesStore = new ImageTexturesStore()
