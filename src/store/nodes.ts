import type {
	BufferRendererRecord,
	CompositionRecord,
	ImageTextureRecord,
	OutputRecord,
	VideoTextureRecord,
	ImageElementRecord,
	VideoElementRecord
} from '$lib/fileSystem/types'
import { writable } from 'svelte/store'

export interface Disconnection {
	source: string
	target: string
}

export type NodeRecord =
	| ImageTextureRecord
	| VideoTextureRecord
	| ImageElementRecord
	| VideoElementRecord
	| BufferRendererRecord
	| CompositionRecord
	| OutputRecord

const output: OutputRecord = {
	id: 'output',
	type: 'output',
	connections: [],
	position: { x: 0, y: 0 }
}
export const nodeRecords = writable<Map<string, NodeRecord>>(new Map([['output', output]]))
export const disconnection = writable<Disconnection>({ source: '', target: '' })
