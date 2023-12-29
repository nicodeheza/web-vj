import { Sprite, Texture } from '@pixi/webworker'
import { cratePivot } from './helpers'

class ImageSpriteStor {
	private sprites: Map<string, Sprite> = new Map()

	crateOrReplaceTexture(id: string, texture: Texture) {
		if (this.sprites.has(id)) {
			this.replaceTexture(id, texture)
			return
		}
		const sprite = new Sprite(texture)
		const pivot = cratePivot()

		sprite.addChild(pivot)
		this.sprites.set(id, sprite)
	}

	replaceTexture(id: string, texture: Texture) {
		const sprite = this.sprites.get(id)
		if (!sprite) return
		sprite.texture = texture
	}

	removeTexture(id: string) {
		const sprite = this.sprites.get(id)
		if (!sprite) return
		sprite.texture = Texture.EMPTY
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
