import type { ElementsI, CompositionI } from './types'
import type P5 from 'p5'

export default class Composition implements CompositionI {
	elements: ElementsI[] = []
	ids: Record<string, boolean> = {}

	add(element: ElementsI) {
		const id = element.id
		if (this.ids[id]) throw new Error('id must be unique')
		this.elements.push(element)
		this.ids[id] = true
	}

	delete(id: string) {
		if (!this.ids[id]) throw new Error('id not exist')
		this.elements = this.elements.filter((t) => t.id != id)
		this.ids[id] = false
	}

	moveBack(id: string) {
		const index = this.elements.findIndex((ele) => ele.id === id)
		if (index < 0) throw new Error('id not exist')
		if (index > 0) {
			const ele = this.elements[index]
			this.elements[index] = this.elements[index - 1]
			this.elements[index - 1] = ele
		}
	}

	moveFront(id: string) {
		const index = this.elements.findIndex((ele) => ele.id === id)
		if (index < 0) throw new Error('id not exist')
		if (index < this.elements.length - 1) {
			const ele = this.elements[index]
			this.elements[index] = this.elements[index + 1]
			this.elements[index + 1] = ele
		}
	}

	install(p5: P5) {
		this.elements.forEach((element) => {
			element.install(p5)
		})
	}

	preload() {
		this.elements.forEach((element) => {
			element.preload()
		})
	}
	setup() {
		this.elements.forEach((element) => {
			element.setup()
		})
	}
	draw() {
		this.elements.forEach((element) => {
			element.draw()
		})
	}
}
