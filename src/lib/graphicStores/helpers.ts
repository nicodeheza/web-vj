import { Graphics } from '@pixi/webworker'

export function cratePivot() {
	const pivot = new Graphics()

	pivot.beginFill('red')
	pivot.drawCircle(0, 0, 10)
	pivot.endFill()
	pivot.alpha = 0

	return pivot
}
