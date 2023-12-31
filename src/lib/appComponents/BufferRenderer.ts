import type P5 from 'p5'
import type { FrameBuffer, FrameBufferP5, P5RenderElement } from './types'

export default class BufferRenderer {
	private p5?: P5
	element: P5RenderElement

	img?: FrameBuffer

	constructor(element: P5RenderElement) {
		this.element = element
	}

	install(p5: P5) {
		if (this.element.install) this.element.install(p5)
		this.p5 = p5
	}

	preload() {
		if (!this.p5) return
		if (this.element.preload) this.element.preload()
	}

	setup() {
		if (!this.p5) return
		if (this.element.setup) this.element.setup()
		this.img = (this.p5 as FrameBufferP5).createFramebuffer()
	}

	draw() {
		if (!this.img || !this.p5) return
		this.img?.begin()
		this.p5.background(0, 0, 0, 0)
		this.element.draw()
		this.img?.end()
	}
}
