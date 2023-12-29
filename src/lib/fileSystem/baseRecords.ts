import { getRandomWords } from '$lib/helpers/randomName'
import type {
	ImageTextureRecord,
	BufferRendererRecord,
	CompositionRecord,
	VideoTextureRecord,
	ImageElementRecord,
	VideoElementRecord
} from './types'
import { v4 as uuid } from 'uuid'

export const getBaseImageTexture = (): ImageTextureRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'imageTexture',
	props: {
		url: '/img/test.jpg'
	}
})

export const getBaseVideoTexture = (): VideoTextureRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'videoTexture',
	props: {
		url: '/vid/loopTest.json'
	}
})

export const getBaseImageElement = (): ImageElementRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'imageElement',
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

export const getBaseVideoElement = (): VideoElementRecord => ({
	connections: [],
	position: { x: 0, y: 0 },
	id: uuid(),
	type: 'videoElement',
	props: {
		name: getRandomWords(),
		x: 0,
		y: 0,
		rotation: 0,
		scale: 1,
		pivotX: 0,
		pivotY: 0,
		isPlaying: true
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
