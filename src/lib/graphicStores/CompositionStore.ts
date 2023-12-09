import { Container } from '@pixi/webworker'

class CompositionStore {
	private compositions: Map<string, Container> = new Map()

	getOrCreate(id: string) {
		if (this.compositions.has(id)) return this.compositions.get(id)
		const composition = new Container()
		composition.sortableChildren = true
		this.compositions.set(id, composition)
		return composition
	}

	delete(id: string) {
		const composition = this.compositions.get(id)
		if (!composition) return
		composition.destroy()
		this.compositions.delete(id)
	}
}

export const compositionStore = new CompositionStore()
