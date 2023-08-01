import type {
	BufferRendererRecord,
	CompositionRecord,
	ImageBufferRecord,
	TransformationRecord
} from '$lib/fileSystem/types'
import { writable } from 'svelte/store'

export type NodeRecord =
	| ImageBufferRecord
	| TransformationRecord
	| BufferRendererRecord
	| CompositionRecord

export const nodeRecords = writable<Record<string, NodeRecord>>({})
