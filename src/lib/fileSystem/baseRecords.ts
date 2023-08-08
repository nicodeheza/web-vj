import { getRandomWords } from '$lib/helpers/randomName'
import type {
	ImageBufferRecord,
	TransformationRecord,
	BufferRendererRecord,
	CompositionRecord
} from './types'
import { v4 as uuid } from 'uuid'

export const getBaseImageBuffer = (): ImageBufferRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'imageBuffer',
	props: {
		url: 'img/test.jpg'
	}
})

export const getBaseTransformation = (): TransformationRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'transformation',
	props: {
		name: getRandomWords(),
		x: 0,
		y: 0,
		rotation: 0,
		scale: 1,
		pivotX: 0,
		pivotY: 0
	}
})

export const getBaseBufferRenderer = (): BufferRendererRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'bufferRenderer'
})

export const getBaseComposition = (): CompositionRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'composition'
})
