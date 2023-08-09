import type {
	BufferRendererRecord,
	CompositionRecord,
	ImageBufferRecord,
	TransformationRecord,
	OutputRecord,
	VideoBufferRecord
} from '$lib/fileSystem/types'
import { writable } from 'svelte/store'

export type NodeRecord =
	| ImageBufferRecord
	| VideoBufferRecord
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
