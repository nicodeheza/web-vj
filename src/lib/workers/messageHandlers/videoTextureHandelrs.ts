import { VideoTextureStore } from '$lib/graphicStores'
import { videoTextureStore } from '$lib/graphicStores/VideoTextureStore'
import type { Action } from '../types'
import type { Handlers } from './types'

export const videoTextureHandlers: Handlers = {
	crateOrEdit: ({ url, id }: Action['payload']) => {
		VideoTextureStore.crateOrUpdate(url, id)
	},
	delete: ({ id }: Action['payload']) => {
		videoTextureStore.delete(id)
	}
}
