import type { Container, DisplayObject } from '@pixi/webworker'
import type { Action } from '../types'
import type { Handlers } from './types'
import { ImageSpriteStor, VideoSpriteStore } from '$lib/graphicStores'

type Stores = typeof ImageSpriteStor | typeof VideoSpriteStore

const spritesStores: Record<string, Stores> = {
	imageSprite: ImageSpriteStor,
	videoSprite: VideoSpriteStore
}

export function getOutputHandlers(stage: Container<DisplayObject>): Handlers {
	return {
		addChild: ({ childId, type }: Action['payload']) => {
			const child = spritesStores[type].get(childId)
			if (!child) return
			stage.addChild(child)
		},
		removeChild: ({ childId, type }: Action['payload']) => {
			const child = spritesStores[type].get(childId)
			if (!child) return
			stage.removeChild(child)
		}
	}
}
