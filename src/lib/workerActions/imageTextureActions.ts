import { nodeRecords } from 'store/nodes'
import { postActionFactory } from '.'
import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
import type { ImageTextureRecord } from '$lib/fileSystem/types'

const postAction = postActionFactory('imageTexture')

export function crateOrEditImageTexture(url: string, id: string) {
	postAction({
		action: 'crateOrEdit',
		payload: {
			id,
			url
		}
	})

	nodeRecords.update((nodeRecords) => {
		const node = nodeRecords.get(id) as ImageTextureRecord
		node.props.url = url
		updateNodeRecordStorage(nodeRecords)
		return nodeRecords
	})
}

export function deleteImageTexture(id: string) {
	postAction({
		action: 'delete',
		payload: {
			id
		}
	})

	nodeRecords.update((records) => {
		records.delete(id)
		updateNodeRecordStorage(records)
		return records
	})
}
