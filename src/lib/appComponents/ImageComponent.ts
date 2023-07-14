import type P5 from 'p5'
import type { AssetComponentI } from './types'

export default class ImageComponent implements AssetComponentI {
	width: number
	height: number
	x: number
	y: number
	rotation: number
	scale: number
	uri: string
	p5: P5
	img: P5.Image | undefined
	output: P5.Graphics | undefined
	constructor(uri: string, p5: P5) {
		this.p5 = p5
		this.uri = uri
		this.width = p5.width
		this.height = p5.height
		this.x = 0
		this.y = 0
		this.rotation = 0
		this.scale = 1
	}

	preload() {
		this.img = this.p5.loadImage(this.uri)
	}

	setup() {
		// can't import frameBuffer, if are performance issues check it
		this.output = this.p5.createGraphics(this.p5.width, this.p5.height, this.p5.WEBGL)
		this.img?.loadPixels()
	}

	display() {
		this.output?.background(0)
		if (!this.img) return
		this.output?.image(this.img, this.x, this.y, this.width, this.height)
	}
}
