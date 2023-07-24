import type p5 from 'p5'

export interface P5compatible {
	preload?: () => void
	setup?: () => void
	draw?: () => void
}

export interface P5RenderElement {
	preload?: () => void
	setup?: () => void
	draw: () => void
}

export interface AssetComponentI {
	p5: p5
	img: p5.Image | undefined
	width: number
	height: number
	x: number
	y: number
	rotation: number
	scale: number
	uri: string
	output: p5.Graphics | undefined
	preload: () => void
	setup: () => void
	draw: () => void
}

export interface BufferI {
	uri: string
	img?: p5.Image
	preload: () => void
	setup?: () => void
	draw?: () => void
}

export interface TransformationsI {
	width: number
	height: number
	x: number
	y: number
	rotation: number
	scale: number
	pivotX: number
	pivotY: number
	id: string
	name: string
	preload: () => void
	setup: () => void
	draw: () => void
}

export interface CompositionI {
	preload: () => void
	setup: () => void
	draw: () => void
	add: (transformation: TransformationsI) => void
	delete: (id: string) => void
	moveBack: (id: string) => void
	moveFront: (id: string) => void
	transformations: TransformationsI[]
}

export interface FrameBuffer extends p5.Image {
	begin: () => void
	end: () => void
	resize: (w: number, h: number) => void
}

export interface FrameBufferP5 extends p5 {
	createFramebuffer: (arg?: unknown) => FrameBuffer
}
