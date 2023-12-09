import type P5 from 'p5'
import type { BufferI } from './types'

export default class ImageTexture implements BufferI {
	private p5?: P5
	uri: string
	img?: P5.Image
	constructor(uri: string) {
		this.uri = uri
	}

	install(p5: P5) {
		this.p5 = p5
	}

	preload() {
		if (!this.p5) return
		this.img = this.p5.loadImage(this.uri)
	}
}
