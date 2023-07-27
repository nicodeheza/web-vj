import type { TransformationsI, CompositionI } from './types'

export default class Composition implements CompositionI {
	transformations: TransformationsI[] = []
	ids: Record<string, boolean> = {}

	add(transformation: TransformationsI) {
		const id = transformation.id
		if (this.ids[id]) throw new Error('id must be unique')
		this.transformations.push(transformation)
		this.ids[id] = true
	}

	delete(id: string) {
		if (!this.ids[id]) throw new Error('id not exist')
		this.transformations = this.transformations.filter((t) => t.id != id)
		this.ids[id] = false
	}

	moveBack(id: string) {
		const index = this.transformations.findIndex((ele) => ele.id === id)
		if (index < 0) throw new Error('id not exist')
		if (index > 0) {
			const ele = this.transformations[index]
			this.transformations[index] = this.transformations[index - 1]
			this.transformations[index - 1] = ele
		}
	}

	moveFront(id: string) {
		const index = this.transformations.findIndex((ele) => ele.id === id)
		if (index < 0) throw new Error('id not exist')
		if (index < this.transformations.length - 1) {
			const ele = this.transformations[index]
			this.transformations[index] = this.transformations[index + 1]
			this.transformations[index + 1] = ele
		}
	}

	preload() {
		this.transformations.forEach((transformation) => {
			transformation.preload()
		})
	}
	setup() {
		this.transformations.forEach((transformation) => {
			transformation.setup()
		})
	}
	draw() {
		this.transformations.forEach((transformation) => {
			transformation.draw()
		})
	}
}
