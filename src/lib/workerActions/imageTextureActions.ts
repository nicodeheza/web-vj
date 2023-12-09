import { postActionFactory } from '.'

const postAction = postActionFactory('imageTexture')

export function crateOrEditImageTexture(url: string, id: string) {
	postAction({
		action: 'crateOrEdit',
		payload: {
			id,
			url
		}
	})
}
