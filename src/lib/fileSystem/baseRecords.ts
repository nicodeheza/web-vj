import { getRandomWords } from '$lib/helpers/randomName'
import type {
	ImageBufferRecord,
	TransformationRecord,
	BufferRendererRecord,
	CompositionRecord
} from './types'
import { v4 as uuid } from 'uuid'

const baseNode = {
	connections: [],
	position: { x: 0, y: 0 }
}

export const getBaseImageBuffer = (): ImageBufferRecord => ({
	...baseNode,
	id: uuid(),
	type: 'imageBuffer',
	props: {
		url: 'img/test.jpg'
	}
})

export const getBaseTransformation = (): TransformationRecord => ({
	...baseNode,
	id: uuid(),
	type: 'transformation',
	props: {
		name: getRandomWords(),
		x: 0,
		y: 0,
		rotation: 0,
		scale: 1,
		pivoteX: 0,
		pivoteY: 0
	}
})

export const getBaseBufferRenderer = (): BufferRendererRecord => ({
	...baseNode,
	id: uuid(),
	type: 'bufferRenderer'
})

export const getBaseComposition = (): CompositionRecord => ({
	...baseNode,
	id: uuid(),
	type: 'composition'
})
