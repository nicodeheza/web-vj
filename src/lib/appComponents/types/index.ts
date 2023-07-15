import type p5 from 'p5'

export interface P5compatible {
	preload?: () => void
	setup?: () => void
	draw?: () => void
	keyPressed?: () => void
	mousePressed?: () => void
	mouseDragged?: () => void
	mouseReleased?: () => void
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
	preload: () => void
	setup: () => void
	draw: () => void
	keyPressed: () => void
	mousePressed: () => void
	mouseDragged: () => void
	mouseReleased: () => void
}
