import type P5 from 'p5'
import type { BufferI, TransformationsI } from './types'

export default class Transformations implements TransformationsI {
	private buffer: BufferI
	private img?: P5.Image
	private p5: P5
	id: string
	width: number
	height: number
	x = 0
	y = 0
	rotation = 0
	scale = 1
	pivotX = 0
	pivotY = 0
	lPivotX = 0
	lPivotY = 0
	showPivot = false

	constructor(buffer: BufferI, compWidth: number, compHeight: number, id: string, p5: P5) {
		this.buffer = buffer
		this.p5 = p5
		this.width = compWidth
		this.height = compHeight
		this.id = id
	}

	preload() {
		this.buffer.preload()
	}

	setup() {
		if (this.buffer.setup) this.buffer.setup()
		this.img = this.buffer.img
	}

	draw() {
		if (this.buffer.draw) {
			this.buffer.draw()
			this.img = this.buffer.img
		}
		if (!this.img) return
		const x = (this.img.width / 2) * -1 + this.x - this.pivotX
		const y = (this.img.height / 2) * -1 + this.y - this.pivotY

		this.p5.push()

		this.p5.translate(this.pivotX, this.pivotY)
		this.p5.rotate((this.rotation * Math.PI) / 180)
		this.p5.scale(this.scale)
		this.p5.image(this.img, x, y)

		if (this.showPivot) {
			this.p5.fill('red')
			this.p5.noStroke()
			this.p5.ellipse(this.x, this.y, 10 / this.scale)
		}

		this.lPivotX = this.pivotX
		this.lPivotY = this.pivotY

		this.p5.pop()
	}

	updateId(newId: string) {
		this.id = newId
	}
}
