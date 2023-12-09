import type { Container, DisplayObject } from '@pixi/webworker'
import type { Action } from '../types'
import { imageSpriteStore } from '$lib/graphicStores/ImageSpriteStore'
import type { Handlers } from './types'

export function getOutputHandlers(stage: Container<DisplayObject>): Handlers {
	return {
		addChild: ({ childId, type }: Action['payload']) => {
			if (type === 'imageSprite') {
				const child = imageSpriteStore.get(childId)
				if (!child) return
				stage.addChild(child)
			}
		},
		removeChild: ({ childId, type }: Action['payload']) => {
			if (type === 'imageSprite') {
				const child = imageSpriteStore.get(childId)
				if (!child) return
				stage.removeChild(child)
			}
		}
	}
}
