import type P5 from 'p5'
import type { BufferI, TransformationsI } from './types'

export default class Transformations implements TransformationsI {
	private p5?: P5
	id: string
	name: string
	buffer: BufferI
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

	constructor(buffer: BufferI, compWidth: number, compHeight: number, name: string, id: string) {
		this.buffer = buffer
		this.width = compWidth
		this.height = compHeight
		this.name = name
		this.id = id
	}

	install(p5: P5) {
		this.buffer.install(p5)
		this.p5 = p5
	}

	preload() {
		if (!this.p5) return
		this.buffer.preload()
	}

	setup() {
		if (!this.p5) return
		if (this.buffer.setup) this.buffer.setup()
	}

	draw() {
		if (!this.p5) return
		if (this.buffer.draw) this.buffer.draw()
		if (!this.buffer.img) return

		const x = (this.buffer.img.width / 2) * -1 + this.x - this.pivotX
		const y = (this.buffer.img.height / 2) * -1 + this.y - this.pivotY

		this.p5.push()

		this.p5.translate(this.pivotX, this.pivotY)
		this.p5.rotate((this.rotation * Math.PI) / 180)
		this.p5.scale(this.scale)
		this.p5.image(this.buffer.img, x, y)

		if (this.showPivot) {
			this.p5.fill('red')
			this.p5.ellipse(this.x, this.y, 10 / this.scale)
		}

		this.lPivotX = this.pivotX
		this.lPivotY = this.pivotY

		this.p5.pop()
	}
}
