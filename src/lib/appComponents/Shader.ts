import type P5 from 'p5'
import type { BufferI, FrameBuffer, FrameBufferP5 } from './types'

export default class Shader implements BufferI {
	private p5?: P5
	private vert?: string
	private frag?: string
	private shader?: P5.Shader

	uri = ''
	u_texture?: BufferI
	u_mouse = false
	u_time = false
	u_resolution = false
	resolution = [600, 600]

	img?: FrameBuffer

	install(p5: P5) {
		this.p5 = p5
	}

	setShader(vert: string, frag: string) {
		this.vert = vert
		this.frag = frag
	}

	setImageU(buffer: BufferI) {
		this.u_texture = buffer
	}

	setResolution(resolution: [number, number]) {
		this.resolution = resolution
	}

	switchUTime() {
		this.u_time = !this.u_time
	}

	switchUMouse() {
		this.u_mouse = !this.u_mouse
	}

	preload() {
		if (!this.p5) return
		if (this.u_texture) this.u_texture.preload()
		if (!this.vert || !this.frag) return
		this.shader = this.p5.loadShader(this.vert, this.frag)
	}

	setup() {
		if (!this.p5) return
		this.img = (this.p5 as FrameBufferP5).createFramebuffer()
		if (this.u_texture) {
			if (this.u_texture.setup) this.u_texture.setup()
			if (this.u_texture.img) {
				const { width, height } = this.u_texture.img
				this.resolution = [width, height]
			}
		}

		this.img.resize(this.resolution[0], this.resolution[1])
	}

	draw() {
		if (!this.p5) return

		if (this.u_texture?.draw) this.u_texture.draw()
		if (!this.shader || !this.img) return
		this.img.begin()

		this.p5.shader(this.shader)

		if (this.u_texture?.img) this.shader.setUniform('u_texture', this.u_texture.img)
		if (this.u_resolution) this.shader.setUniform('u_resolution', this.resolution)
		if (this.u_mouse) this.shader.setUniform('u_mouse', [this.p5.mouseX, this.p5.mouseY])
		if (this.u_time) this.shader.setUniform('u_time', this.p5.millis())

		this.p5.rect(0, 0, this.resolution[0], this.resolution[1])

		this.img.end()
	}
}
