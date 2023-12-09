import { getRandomWords } from '$lib/helpers/randomName'
import type {
	ImageTextureRecord,
	TransformationRecord,
	BufferRendererRecord,
	CompositionRecord,
	VideoTextureRecord
} from './types'
import { v4 as uuid } from 'uuid'

export const getBaseImageTexture = (): ImageTextureRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'imageTexture',
	props: {
		url: 'img/test.jpg'
	}
})

export const getBaseVideoTexture = (): VideoTextureRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'videoTexture',
	props: {
		url: 'vid/test.mp4'
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
