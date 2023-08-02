export interface Position {
	x: number
	y: number
}
interface NodeRecord {
	id: string
	connections: string[]
	position: Position
}

export interface ImageBufferProps {
	url: string
}
export interface ImageBufferRecord extends NodeRecord {
	type: 'imageBuffer'
	props: ImageBufferProps
}

export interface TransformationProps {
	name: string
	x: number
	y: number
	rotation: number
	scale: number
	pivoteX: number
	pivoteY: number
}
export interface TransformationRecord extends NodeRecord {
	type: 'transformation'
	props: TransformationProps
}

export interface BufferRendererRecord extends NodeRecord {
	type: 'bufferRenderer'
}

export interface CompositionRecord extends NodeRecord {
	type: 'composition'
}

export interface OutputRecord extends NodeRecord {
	type: 'output'
}
