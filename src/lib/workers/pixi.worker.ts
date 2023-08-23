import { Application, Assets, Sprite } from '@pixi/webworker'

self.onmessage = async ({ data: { options } }) => {
	const app = new Application(options)

	const texture = await Assets.load('/img/test.jpg')
	const sprite = new Sprite(texture)
	sprite.anchor.set(0.5)
	sprite.x = app.screen.width / 2
	sprite.y = app.screen.height / 2
	sprite.scale.set(0.5)
	sprite.angle = 45
	app.stage.addChild(sprite)
}
