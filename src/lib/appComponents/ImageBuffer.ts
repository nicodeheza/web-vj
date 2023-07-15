import type P5 from 'p5'
import type { BufferI } from './types'

export default class ImageBuffer implements BufferI {
	private p5: P5
	uri: string
	img?: P5.Image
	constructor(uri: string, p5: P5) {
		this.p5 = p5
		this.uri = uri
	}

	preload() {
		this.img = this.p5.loadImage(this.uri)
	}
}
