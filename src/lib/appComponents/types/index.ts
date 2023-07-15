import type p5 from 'p5'

export interface P5compatible {
	preload: () => void
	setup: () => void
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

export interface BufferI extends P5compatible {
	uri: string
	img?: p5.Image
}

export interface TransformationsI extends P5compatible {
	width: number
	height: number
	x: number
	y: number
	rotation: number
	scale: number
	pivotX: number
	pivotY: number
}
