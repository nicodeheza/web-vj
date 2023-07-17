import type P5 from 'p5'
import type { BufferI } from './types'

interface VideoI extends P5.MediaElement {
	get: () => P5.Image
	hide: () => void
}

export default class VideoBuffer implements BufferI {
	private p5: P5
	video?: VideoI
	uri: string
	img?: P5.Image
	constructor(uri: string, p5: P5) {
		this.p5 = p5
		this.uri = uri
	}

	preload() {
		this.video = this.p5.createVideo(this.uri) as VideoI
	}

	setup() {
		if (!this.video) return
		this.video.volume(0)
		this.video.loop()
		this.video.hide()
	}

	draw() {
		if (!this.video) return
		this.img = this.video.get()
	}
}
