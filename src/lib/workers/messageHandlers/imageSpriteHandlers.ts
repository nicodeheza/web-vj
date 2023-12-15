import { ImageSpriteStor, ImageTexturesStore } from '$lib/graphicStores'
import type { Action } from '../types'
import type { Handlers } from './types'
let timeOut: NodeJS.Timeout
export const imageSpriteHandlers: Handlers = {
	crateOrReplaceTexture: ({ textureId, id }: Action['payload']) => {
		const texture = ImageTexturesStore.get(textureId)
		if (!texture) return
		ImageSpriteStor.crateOrReplaceTexture(id, texture)
	},
	scale: ({ x, y, id }: Action['payload']) => {
		const sprite = ImageSpriteStor.get(id)
		if (!sprite) return
		const [xScale, yScale] = [Number(x), Number(y)]
		sprite.scale.set(xScale, yScale)
	},
	translate: ({ x, y, id }: Action['payload']) => {
		const sprite = ImageSpriteStor.get(id)
		if (!sprite) return
		const [xPos, yPos] = [Number(x), Number(y)]
		sprite.position.set(xPos, yPos)
	},
	rotate: ({ deg, id }: Action['payload']) => {
		const sprite = ImageSpriteStor.get(id)
		if (!sprite) return
		const ang = Number(deg)
		sprite.angle = ang
	},
	setPivotPoint: ({ x, y, id }: Action['payload']) => {
		const sprite = ImageSpriteStor.get(id)
		if (!sprite) return
		clearTimeout(timeOut)
		timeOut = setTimeout(() => {
			sprite.children[0].alpha = 0
		}, 1000)
		const [xPos, yPos] = [Number(x), Number(y)]
		sprite.pivot.set(xPos, yPos)
		sprite.children[0].position.set(xPos, yPos)
		sprite.children[0].alpha = 1
	},
	delete: ({ id }: Action['payload']) => {
		ImageSpriteStor.delete(id)
	},
	removeTexture: ({ id }: Action['payload']) => {
		ImageSpriteStor.removeTexture(id)
	}
}
