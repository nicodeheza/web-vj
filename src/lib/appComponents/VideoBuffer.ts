import type P5 from 'p5'
import type { BufferI } from './types'

export interface VideoI extends P5.Image {
	hide: () => void
	volume: (vol: number) => void
	loop: () => void
	pause: () => void
	time: (time?: number) => void
	width: number
	height: number
}

export default class VideoBuffer implements BufferI {
	private p5?: P5
	uri: string
	img?: VideoI
	constructor(uri: string) {
		this.uri = uri
	}

	install(p5: P5) {
		this.p5 = p5
	}

	preload() {
		return
	}

	setup() {
		if (!this.p5) return
		this.img = this.p5.createVideo(this.uri) as unknown as VideoI
		if (!this.img) return
		this.img.volume(0)
		this.img.loop()
		this.img.hide()
	}

	play() {
		if (!this.img) return
		this.img.loop()
	}

	pause() {
		if (!this.img) return
		this.img.pause()
	}

	stop() {
		if (!this.img) return
		this.img.time(0)
		this.img.pause()
	}
}
