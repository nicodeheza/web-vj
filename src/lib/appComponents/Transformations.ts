import type P5 from 'p5'
import type { BufferI, TransformationsI } from './types'

export default class Transformations implements TransformationsI {
	private buffer: BufferI
	private img?: P5.Image
	private p5: P5
	width: number
	height: number
	x: number
	y: number
	rotation: number
	scale: number
	pivotX: number
	pivotY: number

	constructor(buffer: BufferI, compWidth: number, compHeight: number, p5: P5) {
		this.buffer = buffer
		this.p5 = p5
		this.width = compWidth
		this.height = compHeight
		this.x = 0
		this.y = 0
		this.rotation = 0
		this.scale = 1
		this.pivotX = 0
		this.pivotY = 0
	}

	preload() {
		this.buffer.preload()
	}

	setup() {
		this.buffer.setup()
		this.img = this.buffer.img
		this.p5.noStroke()
	}

	draw() {
		this.buffer.draw()
		if (!this.img) return
		const x = (this.img.width / 2) * -1 + this.x - this.pivotX //* this.scale
		const y = (this.img.height / 2) * -1 + this.y - this.pivotY //* this.scale
		this.p5.push()
		this.p5.translate(this.pivotX, this.pivotY)
		this.p5.rotate((this.rotation * Math.PI) / 180)
		this.p5.scale(this.scale)
		this.p5.image(this.img, x, y)
		this.p5.fill('red')
		this.p5.ellipse(this.x, this.y, 10 / this.scale)
		this.p5.pop()
	}
}
