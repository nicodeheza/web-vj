import { nodeRecords } from 'store/nodes'
import { postActionFactory } from '.'
import type { VideoTextureRecord } from '$lib/fileSystem/types'
import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'

const postAction = postActionFactory('videoTexture')

export function crateOrEditVideoTexture(url: string, id: string) {
	postAction({
		action: 'crateOrEdit',
		payload: {
			id,
			url
		}
	})

	nodeRecords.update((nodeRecords) => {
		const node = nodeRecords.get(id) as VideoTextureRecord
		node.props.url = url
		updateNodeRecordStorage(nodeRecords)
		return nodeRecords
	})
}

export function deleteVideoTexture(id: string) {
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
