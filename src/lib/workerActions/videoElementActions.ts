import { nodeRecords } from 'store/nodes'
import { postActionFactory } from '.'
import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'
import type { VideoElementRecord } from '$lib/fileSystem/types'

const postAction = postActionFactory('videoElement')

export function crateVideoElementOrReplaceTexture(textureId: string, id: string) {
	postAction({
		action: 'crateOrReplaceTexture',
		payload: {
			id,
			textureId
		}
	})
}

export function videoElementScale([x, y]: [number, number], id: string) {
	postAction({
		action: 'scale',
		payload: {
			id,
			x: String(x),
			y: String(y)
		}
	})
	nodeRecords.update((nodeRecords) => {
		const node = nodeRecords.get(id) as VideoElementRecord
		node.props.scale = x
		updateNodeRecordStorage(nodeRecords)
		return nodeRecords
	})
}

export function videoElementTranslate([x, y]: [number, number], id: string) {
	postAction({
		action: 'translate',
		payload: {
			id,
			x: String(x),
			y: String(y)
		}
	})
	nodeRecords.update((nodeRecords) => {
		const node = nodeRecords.get(id) as VideoElementRecord
		node.props.x = x
		node.props.y = y
		updateNodeRecordStorage(nodeRecords)
		return nodeRecords
	})
}

export function videoElementRotate(deg: number, id: string) {
	postAction({
		action: 'rotate',
		payload: {
			id,
			deg: String(deg)
		}
	})

	nodeRecords.update((nodeRecords) => {
		const node = nodeRecords.get(id) as VideoElementRecord
		node.props.rotation = deg
		updateNodeRecordStorage(nodeRecords)
		return nodeRecords
	})
}

export function videoElementSetPivot([x, y]: [number, number], id: string) {
	postAction({
		action: 'setPivotPoint',
		payload: {
			id,
			x: String(x),
			y: String(y)
		}
	})

	nodeRecords.update((nodeRecords) => {
		const node = nodeRecords.get(id) as VideoElementRecord
		node.props.pivotX = x
		node.props.pivotY = y
		updateNodeRecordStorage(nodeRecords)
		return nodeRecords
	})
}

export function videoElementDelete(id: string) {
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

export function videoElementRemoveTexture(id: string) {
	postAction({
		action: 'removeTexture',
		payload: {
			id
		}
	})
}

export function play(id: string) {
	postAction({
		action: 'play',
		payload: { id }
	})
}

export function stop(id: string) {
	postAction({
		action: 'stop',
		payload: { id }
	})
}
