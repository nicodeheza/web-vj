import type { FrameBuffer, FrameBufferP5 } from '$lib/appComponents/types'
import P5 from 'p5'

let img: FrameBuffer
const sketch = (p5: FrameBufferP5) => {
	p5.setup = () => {
		img = p5.createFramebuffer()
	}
	p5.draw = () => {
		if (!img) return
		img.begin()
		p5.background(0)
		p5.fill('red')
		p5.ellipse(20, 20, p5.width / 2, p5.height / 2)
		img.end()

		postMessage(img)
	}
}

new P5(sketch)

export {}
