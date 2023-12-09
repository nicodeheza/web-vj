import { Application, type ICanvas } from '@pixi/webworker'

let app: Application<ICanvas>

self.onmessage = async (event) => {
	if (event.data.options) {
		const { options } = event.data
		app = new Application(options)
	}
}
