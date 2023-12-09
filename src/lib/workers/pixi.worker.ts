import type { Frame } from '$lib/graphicStores/types'
import { Application, Sprite, Texture, type ICanvas, AnimatedSprite } from '@pixi/webworker'

let app: Application<ICanvas>

self.onmessage = async (event) => {
	if (event.data.options) {
		const { options } = event.data
		const texture = Texture.from('/img/test.jpg')
		app = new Application(options)

		const sprite = new Sprite(texture)
		sprite.anchor.set(0.5)
		sprite.x = app.screen.width / 2
		sprite.y = app.screen.height / 2
		sprite.scale.set(0.5)
		sprite.angle = 45

		app.stage.addChild(sprite)

		fetch('/vid/loopTest.json')
			.then<Frame[]>((data) => data.json())
			.then((frames) => {
				const textures = frames.map(({ image, time }) => ({
					texture: Texture.from(image),
					time
				}))
				const animatedSprite = new AnimatedSprite(textures)
				animatedSprite.loop = true
				animatedSprite.play()
				animatedSprite.x = 0
				animatedSprite.y = 0
				animatedSprite.scale.set(0.5)
				app.stage.addChild(animatedSprite)
			})
	}
}
