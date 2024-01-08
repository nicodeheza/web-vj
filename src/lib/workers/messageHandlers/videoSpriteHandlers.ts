import { VideoSpriteStore } from '$lib/graphicStores'
import type { Action } from '../types'
import type { Handlers } from './types'

let timeOut: NodeJS.Timeout

export const videoSpriteHandles: Handlers = {
	crateOrReplaceTexture: ({ textureId, id }: Action['payload']) => {
		VideoSpriteStore.createOrReplaceTexture(id, textureId)
	},
	scale: ({ x, y, id }: Action['payload']) => {
		const sprite = VideoSpriteStore.get(id)
		if (!sprite) return
		const [xScale, yScale] = [Number(x), Number(y)]
		sprite.scale.set(xScale, yScale)
	},
	translate: ({ x, y, id }: Action['payload']) => {
		const sprite = VideoSpriteStore.get(id)
		if (!sprite) return
		const [xPos, yPos] = [Number(x), Number(y)]
		sprite.position.set(xPos, yPos)
	},
	rotate: ({ deg, id }: Action['payload']) => {
		const sprite = VideoSpriteStore.get(id)
		if (!sprite) return
		const ang = Number(deg)
		sprite.angle = ang
	},
	setPivotPoint: ({ x, y, id }: Action['payload']) => {
		const sprite = VideoSpriteStore.get(id)
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
		VideoSpriteStore.delete(id)
	},
	removeTexture: ({ id }: Action['payload']) => {
		VideoSpriteStore.removeTexture(id)
	},
	play: ({ id }: Action['payload']) => {
		VideoSpriteStore.get(id)?.play()
	},
	stop: ({ id }: Action['payload']) => {
		VideoSpriteStore.get(id)?.stop()
	}
}