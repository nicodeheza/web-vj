import { ImageTexturesStore } from '$lib/graphicStores'
import type { Action } from '../types'
import type { Handlers } from './types'

export const imageTextureHandlers: Handlers = {
	crateOrEdit: ({ url, id }: Action['payload']) => {
		ImageTexturesStore.crateOrUpdate(url, id)
	},
	delete: ({ id }: Action['payload']) => {
		ImageTexturesStore.delete(id)
	}
}
