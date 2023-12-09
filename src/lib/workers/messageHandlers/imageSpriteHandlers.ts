import { ImageSpriteStor, ImageTexturesStore } from '$lib/graphicStores'
import type { Action } from '../types'
import type { Handlers } from './types'

export const imageSpriteHandlers: Handlers = {
	crateOrReplaceTexture: ({ textureId, id }: Action['payload']) => {
		const texture = ImageTexturesStore.get(textureId)
		if (!texture) return
		ImageSpriteStor.crateOrReplaceTexture(id, texture)
	}
}
