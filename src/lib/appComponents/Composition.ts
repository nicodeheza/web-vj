import type { TransformationsI, CompositionI } from './types'

export default class Composition implements CompositionI {
	private transformations: TransformationsI[] = []
	private ids: Record<string, number> = {}

	add(transformation: TransformationsI) {
		const id = transformation.id
		if (this.ids[id]) throw new Error('id must be unique')
		this.transformations.push(transformation)
		this.ids[id] = this.transformations.length - 1
	}

	delete(id: string) {
		this.transformations = this.transformations.filter((t) => t.id != id)
	}

	moveBack(id: string) {
		const index = this.ids[id]
		if (index > 0) {
			const ele = this.transformations[index]
			this.transformations[index] = this.transformations[index - 1]
			this.transformations[index - 1] = ele
		}
	}

	moveFront(id: string) {
		const index = this.ids[id]
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
