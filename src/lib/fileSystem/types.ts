export interface Position {
	x: number
	y: number
}
interface NodeRecord {
	id: string
	connections: string[]
	position: Position
}

export interface ImageTextureProps {
	url: string
}
export interface ImageTextureRecord extends NodeRecord {
	type: 'imageTexture'
	props: ImageTextureProps
}

export interface VideoTextureRecord extends NodeRecord {
	type: 'videoTexture'
	props: ImageTextureProps
}

export interface ElementProps {
	name: string
	x: number
	y: number
	rotation: number
	scale: number
	pivotX: number
	pivotY: number
	isPlaying?: boolean
}
export interface ImageElementRecord extends NodeRecord {
	type: 'imageElement'
	props: ElementProps
}

export interface VideoElementRecord extends NodeRecord {
	type: 'videoElement'
	props: ElementProps
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
