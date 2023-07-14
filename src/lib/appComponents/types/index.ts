import type p5 from 'p5'

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
	display: () => void
}
