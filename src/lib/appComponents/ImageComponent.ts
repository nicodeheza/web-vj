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
	pivotX: number
	pivotY: number
	constructor(uri: string, p5: P5) {
		this.p5 = p5
		this.uri = uri
		this.width = 600
		this.height = 600
		this.x = 0
		this.y = 0
		this.rotation = 0
		this.scale = 1
		this.pivotX = 0
		this.pivotY = 0
	}

	preload() {
		this.img = this.p5.loadImage(this.uri)
	}

	setup() {
		// can't import frameBuffer, if are performance issues check it
		this.output = this.p5.createGraphics(this.width, this.height, this.p5.WEBGL)
		this.output.pixelDensity(1)
		this.output.noStroke()
	}

	draw() {
		if (!this.img || !this.output) return
		const x = (this.img.width / 2) * -1 + this.x - this.pivotX //* this.scale
		const y = (this.img.height / 2) * -1 + this.y - this.pivotY //* this.scale
		this.output.background(0, 0, 0, 0)
		this.output.push()
		this.output.translate(x, y)
		this.output.scale(this.scale)
		this.output.rotate(Math.PI * this.rotation)
		this.output.image(this.img, this.pivotX, this.pivotY)
		this.output.pop()
		this.output.fill('red')
		this.output.ellipse(x, y, 10)
	}
}
