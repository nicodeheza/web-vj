import { postActionFactory } from '.'

const postAction = postActionFactory('imageElement')

export function crateImageElementOrReplaceTexture(textureId: string, id: string) {
	postAction({
		action: 'crateOrReplaceTexture',
		payload: {
			id,
			textureId
		}
	})
}

export function imageElementScale([x, y]: [number, number], id: string) {
	postAction({
		action: 'scale',
		payload: {
			id,
			x: String(x),
			y: String(y)
		}
	})
}

export function imageElementTranslate([x, y]: [number, number], id: string) {
	postAction({
		action: 'translate',
		payload: {
			id,
			x: String(x),
			y: String(y)
		}
	})
}

export function imageElementRotate(deg: number, id: string) {
	postAction({
		action: 'rotate',
		payload: {
			id,
			deg: String(deg)
		}
	})
}

export function imageElementSetPivot([x, y]: [number, number], id: string) {
	postAction({
		action: 'setPivotPoint',
		payload: {
			id,
			x: String(x),
			y: String(y)
		}
	})
}
