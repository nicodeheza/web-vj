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
