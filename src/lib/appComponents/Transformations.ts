import type P5 from 'p5'
import type { BufferI, TransformationsI } from './types'

export default class Transformations implements TransformationsI {
	private buffer: BufferI
	private img?: P5.Image
	private p5: P5
	private canMovePivot = false
	interactiveMode = false
	width: number
	height: number
	x = 0
	y = 0
	rotation = 0
	scale = 1
	pivotX = 0
	pivotY = 0

	constructor(buffer: BufferI, compWidth: number, compHeight: number, p5: P5) {
		this.buffer = buffer
		this.p5 = p5
		this.width = compWidth
		this.height = compHeight
	}

	preload() {
		this.buffer.preload()
	}

	setup() {
		this.img = this.buffer.img
	}

	draw() {
		if (!this.img) return
		const x = (this.img.width / 2) * -1 + this.x - this.pivotX
		const y = (this.img.height / 2) * -1 + this.y - this.pivotY

		this.p5.push()

		this.p5.translate(this.pivotX, this.pivotY)
		this.p5.rotate((this.rotation * Math.PI) / 180)
		this.p5.scale(this.scale)
		this.p5.image(this.img, x, y)

		if (this.interactiveMode) {
			this.p5.fill('red')
			this.p5.noStroke()
			this.p5.ellipse(this.x, this.y, 10 / this.scale)
			this.transformRect(x, y, this.img.width, this.img.height)
		}

		this.p5.pop()
	}

	keyPressed() {
		if (this.p5.keyCode === 73) {
			this.interactiveMode = !this.interactiveMode
		}
		return false
	}

	mousePressed() {
		if (this.interactiveMode) {
			const [mx, my] = this.getMousePos()

			const isOnCircle =
				mx >= this.pivotX - 5 &&
				mx <= this.pivotX + 5 &&
				my >= this.pivotY - 5 &&
				my <= this.pivotY + 5

			if (isOnCircle) {
				this.canMovePivot = true
			}
		}

		return false
	}

	mouseDragged() {
		if (this.canMovePivot) {
			const [mx, my] = this.getMousePos()
			this.pivotX = mx
			this.pivotY = my
		}
		return false
	}

	mouseReleased() {
		if (this.canMovePivot) {
			this.canMovePivot = false
		}
		return false
	}

	private getMousePos() {
		const { mouseX, mouseY } = this.p5
		const mx = (this.width / 2 - mouseX) * -1
		const my = (this.height / 2 - mouseY) * -1
		return [mx, my]
	}

	private transformRect(x: number, y: number, w: number, h: number) {
		const p5 = this.p5

		p5.noFill()
		p5.stroke('red')
		p5.strokeWeight(2)
		p5.rect(x, y, w, h)
	}
}
