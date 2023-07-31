import type {
	BufferRendererRecord,
	CompositionRecord,
	ImageBufferRecord,
	TransformationRecord
} from '$lib/fileSystem/types'
import { writable } from 'svelte/store'

type Record = ImageBufferRecord | TransformationRecord | BufferRendererRecord | CompositionRecord
export const nodeRecords = writable<Record[]>([])
