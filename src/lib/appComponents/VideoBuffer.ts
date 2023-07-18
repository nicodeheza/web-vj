import type P5 from 'p5'
import type { BufferI } from './types'

export interface VideoI extends P5.Image {
	hide: () => void
	volume: (vol: number) => void
	loop: () => void
	width: number
	height: number
}

export default class VideoBuffer implements BufferI {
	private p5: P5
	uri: string
	img?: VideoI
	constructor(uri: string, p5: P5) {
		this.p5 = p5
		this.uri = uri
	}

	preload() {
		return
	}

	setup() {
		this.img = this.p5.createVideo(this.uri) as unknown as VideoI
		if (!this.img) return
		this.img.volume(0)
		this.img.loop()
		this.img.hide()
	}
}
