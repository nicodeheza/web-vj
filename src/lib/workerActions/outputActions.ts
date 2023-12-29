import { postActionFactory } from '.'

const postAction = postActionFactory('output')

const typesMap: Record<string, string> = {
	imageElement: 'imageSprite',
	videoElement: 'videoSprite'
}

export function addChild(childId: string, type: string) {
	postAction({
		action: 'addChild',
		payload: {
			childId,
			type: typesMap[type]
		}
	})
}

export function removeChild(childId: string, type: string) {
	postAction({
		action: 'removeChild',
		payload: {
			childId,
			type: typesMap[type]
		}
	})
}
