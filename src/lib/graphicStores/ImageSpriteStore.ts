import { Sprite, type Texture } from '@pixi/webworker'

class ImageSpriteStor {
	private sprites: Map<string, Sprite> = new Map()

	crate(id: string, texture: Texture) {
		if (this.sprites.has(id)) return
		this.sprites.set(id, new Sprite(texture))
	}

	replaceTexture(id: string, texture: Texture) {
		const sprite = this.sprites.get(id)
		if (!sprite) return
		sprite.texture = texture
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
}

export const imageSpriteStore = new ImageSpriteStor()
