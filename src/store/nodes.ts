import type {
	BufferRendererRecord,
	CompositionRecord,
	ImageTextureRecord,
	TransformationRecord,
	OutputRecord,
	VideoTextureRecord
} from '$lib/fileSystem/types'
import { writable } from 'svelte/store'

export type NodeRecord =
	| ImageTextureRecord
	| VideoTextureRecord
	| TransformationRecord
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
