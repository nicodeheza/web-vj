import { Application, Sprite, Texture, type ICanvas } from '@pixi/webworker'

let app: Application<ICanvas>
let vidS: Sprite
self.onmessage = async (event) => {
	if (event.data.options) {
		const { options } = event.data
		app = new Application(options)

		const texture = Texture.from('/img/test.jpg')
		const sprite = new Sprite(texture)
		sprite.anchor.set(0.5)
		sprite.x = app.screen.width / 2
		sprite.y = app.screen.height / 2
		sprite.scale.set(0.5)
		sprite.angle = 45

		app.stage.addChild(sprite)
	} else if (event.data.videoBitmap && app) {
		const video = event.data.videoBitmap

		if (!vidS) {
			const vidT = Texture.from(video)
			vidS = new Sprite(vidT)

			vidS.anchor.set(0.5)
			vidS.x = app.screen.width / 2 - 100
			vidS.y = app.screen.height / 2 - 50
			vidS.scale.set(1)
			vidS.angle = -45

			app.stage.addChild(vidS)
		} else {
			vidS.texture = Texture.from(video)
		}
	}
}
