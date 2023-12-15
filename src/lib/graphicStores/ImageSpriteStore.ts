import { Graphics, Sprite, Texture } from '@pixi/webworker'

class ImageSpriteStor {
	private sprites: Map<string, Sprite> = new Map()

	crateOrReplaceTexture(id: string, texture: Texture) {
		if (this.sprites.has(id)) {
			this.replaceTexture(id, texture)
			return
		}
		const sprite = new Sprite(texture)
		const pivot = new Graphics()

		pivot.beginFill('red')
		pivot.drawCircle(0, 0, 10)
		pivot.endFill()
		pivot.alpha = 0

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
