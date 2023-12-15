import { nodeRecords } from 'store/nodes'
import { postActionFactory } from '.'
import type { ElementRecord } from '$lib/fileSystem/types'
import { updateNodeRecordStorage } from '$lib/fileSystem/helpers'

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
	nodeRecords.subscribe((nodeRecords) => {
		const node = nodeRecords.get(id) as ElementRecord
		node.props.scale = x
		updateNodeRecordStorage(nodeRecords)
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
	nodeRecords.subscribe((nodeRecords) => {
		const node = nodeRecords.get(id) as ElementRecord
		node.props.x = x
		node.props.y = y
		updateNodeRecordStorage(nodeRecords)
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

	nodeRecords.subscribe((nodeRecords) => {
		const node = nodeRecords.get(id) as ElementRecord
		node.props.rotation = deg
		updateNodeRecordStorage(nodeRecords)
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

	nodeRecords.update((nodeRecords) => {
		const node = nodeRecords.get(id) as ElementRecord
		node.props.pivotX = x
		node.props.pivotY = y
		updateNodeRecordStorage(nodeRecords)
		return nodeRecords
	})
}

export function imageElementDelete(id: string) {
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

export function imageElementRemoveTexture(id: string) {
	postAction({
		action: 'removeTexture',
		payload: {
			id
		}
	})
}
